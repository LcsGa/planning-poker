import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LobbyInitGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.user$.pipe(
      map((user) => !!user),
      tap(
        (isAuthenticated) =>
          !isAuthenticated && this.router.navigateByUrl('/auth')
      )
    );
  }
}
