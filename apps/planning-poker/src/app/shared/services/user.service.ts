import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id?: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private USER = 'user';

  private readonly user$$ = new BehaviorSubject<User | null>(null);
  public readonly user$ = this.user$$.asObservable();

  public createUser(name: string): void {
    this.user$$.next({ name });
    localStorage.setItem(this.USER, JSON.stringify(this.user$$.value));
  }

  public fetchStoredUser(): void {
    const storedUser = localStorage.getItem(this.USER);
    this.user$$.next(storedUser ? JSON.parse(storedUser) : null);
  }
}
