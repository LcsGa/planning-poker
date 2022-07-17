import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Lobby, User, UserEvent } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { from, merge, ReplaySubject } from "rxjs";
import { filter, map, mapTo, switchMap, take, tap } from "rxjs/operators";
import { UserService } from "./user.service";

@UntilDestroy()
@Injectable({
  providedIn: "root",
})
export class LobbyService {
  public readonly ID_PATTERN = /^[\w\d]{10}$/;

  private readonly users$$ = new ReplaySubject<User[]>(1);
  public readonly users$ = this.users$$.asObservable();

  private readonly state$$ = new ReplaySubject<Lobby["state"]>(1);
  public readonly state$ = this.state$$.asObservable();

  constructor(private readonly socket: Socket, private readonly userService: UserService) {
    merge(
      socket.fromEvent<Lobby>(UserEvent.CONNECT),
      socket.fromEvent<Lobby>(UserEvent.DISCONNECT).pipe(
        switchMap((lobby) =>
          userService.user$.pipe(
            tap((user) => userService.updateUser(lobby.users.find((u) => u.id === user!.id)!)),
            mapTo(lobby)
          )
        )
      )
    )
      .pipe(
        tap((lobby) => this.users$$.next(lobby.users)),
        untilDestroyed(this)
      )
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
        tap((user) => this.socket.emit(UserEvent.CONNECT, user)),
        switchMap(() => from(this.socket.fromOneTimeEvent<{ user: User; state: Lobby["state"] }>(UserEvent.ME))),
        tap(({ user }) => this.userService.updateUser(user)),
        tap(({ state }) => this.state$$.next(state)),
        map(({ user }) => user as User)
      )
      .subscribe();
  }

  public disconnect(): void {
    this.userService.user$
      .pipe(
        take(1),
        tap((user) => this.socket.emit(UserEvent.DISCONNECT, user)),
        tap(() => this.users$$.next([]))
      )
      .subscribe();
  }
}
