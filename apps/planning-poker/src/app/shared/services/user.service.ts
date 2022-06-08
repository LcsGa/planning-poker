import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';

export interface User {
  id?: string;
  name: string;
  lobbyId?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private USER = 'user';

  private readonly user$$ = new BehaviorSubject<User | null>(null);
  public readonly user$ = this.user$$.asObservable();

  private userSocket?: Socket;

  public create(name: string): void {
    this.user$$.next({ name });
    localStorage.setItem(this.USER, JSON.stringify(this.user$$.value));
  }

  public reset(): void {
    this.user$$.next(null);
    localStorage.removeItem(this.USER);
  }

  public fetchStored(): void {
    const storedUser = localStorage.getItem(this.USER);
    this.user$$.next(storedUser ? JSON.parse(storedUser) : null);
  }

  public addLobby(lobbyId: string): void {
    this.user$$.next({ ...this.user$$.value!, lobbyId });
  }

  public connect(): void {
    this.user$
      .pipe(
        take(1),
        filter((user) => !!user),
        tap(
          (user) =>
            (this.userSocket = io('http://localhost:3000', { auth: user! }))
        )
      )
      .subscribe();
  }
}
