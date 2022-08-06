import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root",
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private readonly userService: UserService, private readonly router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.singleUser$.pipe(
      map((user) => !!user?.name),
      tap((isAuthenticated) => {
        if (!isAuthenticated) this.router.navigateByUrl("/auth");
      })
    );
  }
}
