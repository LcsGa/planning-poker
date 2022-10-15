import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { merge, of, partition, Subject, switchMap, tap } from "rxjs";
import { UserService } from "../shared/services/user.service";
import { Icon } from "../shared/utils/icon.utils";

@UntilDestroy()
@Component({
  selector: "pp-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  protected readonly pseudoCtrl = new FormControl<string>("", { nonNullable: true, validators: Validators.required });

  protected readonly confirmPseudo$$ = new Subject<void>();

  protected readonly ICON = {
    ARROW_RIGHT: Icon.of("chevron-right"),
    USER: Icon.of("user-astronaut"),
  };

  constructor(userService: UserService, router: Router) {
    userService.initStored();
    userService.singleUser$.subscribe((user) => this.pseudoCtrl.setValue(user?.name ?? ""));

    this.confirmPseudo$$
      .pipe(
        switchMap((confirmPseudo) => {
          const [valid$, invalid$] = partition(of(confirmPseudo), () => this.pseudoCtrl.valid);
          return merge(
            valid$.pipe(
              tap(() => {
                userService.create(this.pseudoCtrl.value);
                router.navigateByUrl("/lobby/init");
              })
            ),
            invalid$.pipe(
              tap(() => {
                userService.reset();
                this.pseudoCtrl.updateValueAndValidity();
                this.pseudoCtrl.markAsTouched();
                this.pseudoCtrl.markAsDirty();
              })
            )
          );
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
