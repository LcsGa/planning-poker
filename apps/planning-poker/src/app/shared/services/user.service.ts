import { Injectable } from "@angular/core";
import { User } from "@planning-poker/shared";
import { BehaviorSubject } from "rxjs";
import { Color } from "../utils/color.utils";

@Injectable({ providedIn: "root" })
export class UserService {
  private readonly KEY = "user";

  private readonly user$$ = new BehaviorSubject<User | null>(null);
  public readonly user$ = this.user$$.asObservable();

  public set userId(userId: User["id"]) {
    if (this.user$$.value) {
      this.user$$.next({ ...this.user$$.value, id: userId });
    }
  }

  public get userId(): User["id"] {
    return this.user$$.value?.id;
  }

  public create(name: string): void {
    this.user$$.next({ name, color: Color.random });
    localStorage.setItem(this.KEY, JSON.stringify(this.user$$.value));
  }

  public reset(): void {
    this.user$$.next(null);
    localStorage.removeItem(this.KEY);
  }

  public initStored(): void {
    const storedUser = localStorage.getItem(this.KEY);
    this.user$$.next(storedUser ? JSON.parse(storedUser) : null);
  }

  public joinLobby(lobbyId: string): void {
    this.user$$.next({ ...this.user$$.value!, lobbyId });
  }
}
