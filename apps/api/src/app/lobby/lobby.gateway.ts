import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { PlanningEvent, PokerCard, User, UserEvent } from "@planning-poker/shared";
import { Server, Socket } from "socket.io";
import { LobbyService } from "./lobby.service";
import { FormatResultsPipe } from "./pipes/format-results.pipe";

@WebSocketGateway(3000, { cors: { origin: "*" } })
export class LobbyGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  constructor(private readonly lobbyService: LobbyService, private readonly formatResultsPipe: FormatResultsPipe) {}

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
    client.emit(UserEvent.ME, {
      user: this.lobbyService.lobbies[user.lobbyId].users.find((user) => user.id === client.id),
      state: this.lobbyService.lobbies[user.lobbyId].state,
    });
    this.server.in(user.lobbyId).emit(UserEvent.CONNECT, this.lobbyService.lobbies[user.lobbyId]);
  }

  @SubscribeMessage(UserEvent.DISCONNECT)
  disconnectUser(client: Socket, user: User): void {
    client.leave(user.lobbyId);
    this.lobbyService.disconnect(client.id);
    if (this.lobbyService.lobbies[user.lobbyId]) {
      const lobbyServer = this.server.in(user.lobbyId);
      lobbyServer.emit(UserEvent.DISCONNECT, this.lobbyService.lobbies[user.lobbyId]);
      lobbyServer.emit(
        PlanningEvent.VOTE_COUNT,
        this.lobbyService.lobbies[user.lobbyId].users.filter((user) => user.vote !== undefined).length
      );
    }
  }

  @SubscribeMessage(PlanningEvent.START)
  startPlanning(@MessageBody() lobbyId: string): void {
    this.server.in(lobbyId).emit(PlanningEvent.START);
    this.lobbyService.lobbies[lobbyId].state = "vote";
  }

  @SubscribeMessage(PlanningEvent.VOTE_COUNT)
  requestsVoteCount(@MessageBody() lobbyId: string) {
    this.server
      .in(lobbyId)
      .emit(
        PlanningEvent.VOTE_COUNT,
        this.lobbyService.lobbies[lobbyId].users.filter((user) => user.vote !== undefined).length
      );
  }

  @SubscribeMessage(PlanningEvent.VOTE)
  vote(@MessageBody() { user, points }: { user: User; points?: PokerCard["points"] }): void {
    this.lobbyService.lobbies[user.lobbyId].users.find((u) => u.id === user.id).vote = points;
    this.requestsVoteCount(user.lobbyId);
  }

  @SubscribeMessage(PlanningEvent.VOTE_DONE)
  completeVote(@MessageBody() lobbyId: string): void {
    this.server.in(lobbyId).emit(PlanningEvent.VOTE_DONE);
    this.lobbyService.lobbies[lobbyId].state = "results";
  }

  @SubscribeMessage(PlanningEvent.RESULTS)
  askForResutls(@MessageBody() lobbyId: string): void {
    this.server
      .in(lobbyId)
      .emit(PlanningEvent.RESULTS, this.formatResultsPipe.transform(this.lobbyService.lobbies[lobbyId].users));
  }

  @SubscribeMessage(PlanningEvent.VOTE_NEXT)
  keepVoting(@MessageBody() lobbyId: string): void {
    this.lobbyService.lobbies[lobbyId].users.forEach((user) => (user.vote = undefined));
    this.lobbyService.lobbies[lobbyId].state = "vote";
    this.server.in(lobbyId).emit(PlanningEvent.VOTE_NEXT);
  }
}
