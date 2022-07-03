import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { User, UserEvent } from "@planning-poker/shared";
import { Server, Socket } from "socket.io";
import { LobbyService } from "./lobby.service";

@WebSocketGateway(3000, { cors: { origin: "*" } })
export class LobbyGateway {
  @WebSocketServer()
  private readonly server: Server;

  constructor(private readonly lobbyService: LobbyService) {}

  @SubscribeMessage(UserEvent.CONNECT)
  connectUser(client: Socket, user: User) {
    client.join(user.lobbyId);
    this.lobbyService.join({ ...user, id: client.id });
    this.server.in(user.lobbyId).emit(UserEvent.CONNECT, this.lobbyService.lobbies[user.lobbyId]);
  }

  @SubscribeMessage(UserEvent.DISCONNECT)
  disconnectUser(client: Socket, user: User) {
    client.leave(user.lobbyId);
    this.lobbyService.disconnect(client.id);
    if (this.lobbyService.lobbies[user.lobbyId]) {
      this.server.in(user.lobbyId).emit(UserEvent.DISCONNECT, this.lobbyService.lobbies[user.lobbyId]);
    }
  }
}
