import { Injectable } from "@angular/core";
import { Lobby, User, UserEvent } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { delayWhen, filter, map, merge, Observable, ReplaySubject, switchMap, tap } from "rxjs";
import { UserService } from "./user.service";

export interface UserAndState {
  user: User;
  state: Lobby["state"];
}

@Injectable({
  providedIn: "root",
})
export class LobbyService {
  public readonly ID_PATTERN = /^\w{10,}$/;

  private readonly users$$ = new ReplaySubject<User[]>(1);
  public readonly users$ = this.users$$.asObservable();

  constructor(private readonly socket: Socket, private readonly userService: UserService) {}

  public get usersLength$(): Observable<number> {
    return this.users$.pipe(map((users) => users.length));
  }

  public listenUsersUpdates$(): Observable<unknown> {
    return merge(
      this.socket.fromEvent<Lobby>(UserEvent.CONNECT),
      this.socket.fromEvent<Lobby>(UserEvent.DISCONNECT).pipe(
        delayWhen((lobby) =>
          this.userService.singleUser$.pipe(
            tap((user) => this.userService.updateUser(lobby.users.find((u) => u.id === user!.id)!)) // update the user in case the host left and the user may become the new host
          )
        )
      )
    ).pipe(tap((lobby) => this.users$$.next(lobby.users)));
  }

  public join$(lobbyId: string): Observable<UserAndState> {
    return this.userService.singleUser$.pipe(
      filter(Boolean),
      tap((user) => this.socket.emit(UserEvent.CONNECT, { ...user, lobbyId })),
      switchMap(() => this.socket.fromOneTimeEvent<UserAndState>(UserEvent.ME)),
      tap(({ user }) => this.userService.updateUser(user))
    );
  }

  public leave$(): Observable<User | null> {
    return this.userService.singleUser$.pipe(
      tap((user) => {
        this.socket.emit(UserEvent.DISCONNECT, user);
        this.users$$.next([]);
      })
    );
  }
}
