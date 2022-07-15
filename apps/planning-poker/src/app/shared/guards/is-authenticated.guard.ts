import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root",
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private readonly userService: UserService, private readonly router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.user$.pipe(
      take(1),
      map((user) => !!user?.name),
      tap((isAuthenticated) => {
        if (!isAuthenticated) this.router.navigateByUrl("/auth");
      })
    );
  }
}
