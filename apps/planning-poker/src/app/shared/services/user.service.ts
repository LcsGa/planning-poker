import { Injectable } from "@angular/core";
import { User } from "@planning-poker/shared";
import { BehaviorSubject, take } from "rxjs";
import { Color } from "../utils/color.utils";

@Injectable({ providedIn: "root" })
export class UserService {
  private readonly KEY = "user";

  private readonly user$$ = new BehaviorSubject<User | null>(null);

  public get singleUser$() {
    return this.user$$.pipe(take(1));
  }

  public updateUser(user: User): void {
    this.user$$.next(user);
  }

  public create(name: string): void {
    this.updateUser({ name, color: Color.random });
    localStorage.setItem(this.KEY, JSON.stringify(this.user$$.value));
  }

  public reset(): void {
    this.user$$.next(null);
    localStorage.removeItem(this.KEY);
  }

  public initStored(): void {
    const storedUser = localStorage.getItem(this.KEY);
    this.updateUser(storedUser ? JSON.parse(storedUser) : null);
  }

  public joinLobby(lobbyId: string): void {
    this.updateUser({ ...this.user$$.value!, lobbyId });
  }
}
