import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { PlanningEvent, User, UserEvent } from "@planning-poker/shared";
import { Server, Socket } from "socket.io";
import { LobbyService } from "./lobby.service";

@WebSocketGateway(3000, { cors: { origin: "*" } })
export class LobbyGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  constructor(private readonly lobbyService: LobbyService) {}

  handleDisconnect(client: Socket): void {
    const disconnectedUser = Object.values(this.lobbyService.lobbies)
      .reduce<User[]>((acc, curr) => [...acc, ...curr.users], [])
      .find((user) => user.id === client.id);
    if (disconnectedUser) this.disconnectUser(client, disconnectedUser);
  }

  @SubscribeMessage(UserEvent.CONNECT)
  connectUser(client: Socket, user: User): void {
    client.join(user.lobbyId);
    const me = { ...user, id: client.id };
    this.lobbyService.join(me);
    client.emit(
      UserEvent.ME,
      this.lobbyService.lobbies[user.lobbyId].users.find((user) => user.id === client.id)
    );
    this.server.in(user.lobbyId).emit(UserEvent.CONNECT, this.lobbyService.lobbies[user.lobbyId]);
  }

  @SubscribeMessage(UserEvent.DISCONNECT)
  disconnectUser(client: Socket, user: User): void {
    client.leave(user.lobbyId);
    this.lobbyService.disconnect(client.id);
    if (this.lobbyService.lobbies[user.lobbyId]) {
      this.server.in(user.lobbyId).emit(UserEvent.DISCONNECT, this.lobbyService.lobbies[user.lobbyId]);
    }
  }

  @SubscribeMessage(PlanningEvent.START)
  startPlanning(@MessageBody() lobbyId: string): void {
    this.server.in(lobbyId).emit(PlanningEvent.START);
  }
}
