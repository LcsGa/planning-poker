import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { LobbyService } from "../services/lobby.service";

@Injectable({
  providedIn: "root",
})
export class LeaveLobbyGuard implements CanDeactivate<unknown> {
  constructor(private readonly lobbyService: LobbyService) {}

  canDeactivate(): boolean {
    this.lobbyService.disconnectOnce$().subscribe();
    return true;
  }
}
