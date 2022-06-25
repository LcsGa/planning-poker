import { Injectable } from "@nestjs/common";
import { Lobbies, User } from "@planning-poker/shared";

@Injectable()
export class LobbyService {
  public readonly lobbies: Lobbies = {};

  public join(user: User): void {
    const lobbyId = user.lobbyId;
    if (!this.lobbies[lobbyId]) this.lobbies[lobbyId] = { host: user.id, users: [] };
    this.lobbies[lobbyId].users.push({
      id: user.id,
      name: user.name,
      color: user.color,
      isHost: this.isHost(user),
    });
  }

  private isHost(user: User): boolean {
    return this.lobbies[user.lobbyId].host === user.id;
  }
}
