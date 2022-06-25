import { Injectable } from "@angular/core";
import { Lobby, User, UserEvent } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { filter, switchMap, take, tap } from "rxjs/operators";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class LobbyService {
  public readonly ID_PATTERN = /^[\w\d]{10}$/;

  private readonly users$$ = new ReplaySubject<User[]>(1);
  public readonly users$ = this.users$$.asObservable();

  constructor(private readonly socket: Socket, private readonly userService: UserService) {
    socket
      .fromEvent<Lobby>(UserEvent.CONNECT)
      .pipe(tap((lobby) => this.users$$.next(lobby.users)))
      .subscribe();
  }

  public join(id: string): void {
    this.userService.joinLobby(id);
    this.connect();
  }

  public connect(): void {
    this.userService.user$
      .pipe(
        take(1),
        filter(Boolean),
        tap((user) => this.socket.emit(UserEvent.CONNECT, user))
      )
      .subscribe();
  }
}
