import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LobbyInitGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.userService.user$.pipe(map((user) => !!user));
  }
}
