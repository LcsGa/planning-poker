import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway(3000, { cors: { origin: "*" } })
export class LobbyGateway {
  @SubscribeMessage("ntm")
  private ntm(client: Socket, user: unknown) {
    console.log(user);

  }
}

