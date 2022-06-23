import { Injectable } from "@angular/core";
import { User } from "@planning-poker/shared";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { filter, take, tap } from "rxjs/operators";
import { io, Socket } from "socket.io-client";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class LobbyService {
  public readonly ID_PATTERN = /^[\w\d]{10}$/;

  private userSocket$$ = new BehaviorSubject<Socket | null>(null);

  private readonly users$$ = new ReplaySubject<User[]>(1);
  public readonly users$ = this.users$$.asObservable();

  constructor(private readonly userService: UserService) {}

  private get userSocket(): Socket {
    return this.userSocket$$.value!;
  }

  public create(id: string): void {
    this.userService.joinLobby(id, { isHost: true });
    this.connect();
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
        tap(() => this.userSocket$$.next(io("ws://localhost:3000"))),
        tap((user) => this.userSocket.emit("ntm", user))
      )
      .subscribe();
  }

  public fetchUsers(): void {
    this.userSocket.on("fetch-users", (users: User[]) => this.users$$.next(users));
  }
}
