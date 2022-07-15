import { Injectable } from "@nestjs/common";
import { Lobbies, User } from "@planning-poker/shared";

@Injectable()
export class LobbyService {
  public readonly lobbies: Lobbies = {};

  public join(user: User): void {
    const lobbyId = user.lobbyId;
    if (!this.lobbies[lobbyId]) this.lobbies[lobbyId] = { host: user.id, users: [], started: false };
    this.lobbies[lobbyId].users.push({ ...user, isHost: this.isHost(user) });
  }

  private isHost(user: User): boolean {
    return this.lobbies[user.lobbyId].host === user.id;
  }

  public disconnect(userId: User["id"]): void {
    const lobbyId = this.getLobbyId(userId);
    if (this.lobbies[lobbyId]) {
      if (this.lobbies[lobbyId]?.users.length === 1) {
        delete this.lobbies[lobbyId];
      } else {
        this.lobbies[lobbyId].users = this.lobbies[lobbyId].users.filter((user) => user.id !== userId);
        if (this.lobbies[lobbyId].host === userId) {
          this.lobbies[lobbyId].host = this.lobbies[lobbyId].users[0].id;
          this.lobbies[lobbyId].users[0].isHost = true;
        }
      }
    }
  }

  private getLobbyId(userId: string): string | undefined {
    return Object.entries(this.lobbies).find(([, lobby]) => lobby.users.find((user) => user.id === userId))?.[0];
  }
}
