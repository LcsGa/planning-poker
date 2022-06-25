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
    const lobbyId = user.lobbyId;
    client.join(lobbyId);
    this.lobbyService.join({ ...user, id: client.id });
    this.server.in(lobbyId).emit(UserEvent.CONNECT, this.lobbyService.lobbies[lobbyId]);
  }
}
