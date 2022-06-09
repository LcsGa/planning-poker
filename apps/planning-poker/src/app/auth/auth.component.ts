import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { UserService } from '../shared/services/user.service';
import { Icon } from '../shared/utils/icon.utils';

@Component({
  selector: 'pp-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  public pseudoCtrl!: FormControl;

  public readonly ICON = {
    ARROW_RIGHT: Icon.of('chevron-right'),
    USER: Icon.of('user-astronaut'),
  };

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.pseudoCtrl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.userService.fetchStored();
    this.userService.user$
      .pipe(
        take(1),
        tap((user) => this.pseudoCtrl.setValue(user?.name ?? ''))
      )
      .subscribe();
  }

  public confirmPseudo(): void {
    if (this.pseudoCtrl.valid) {
      this.userService.create(this.pseudoCtrl.value);
    } else {
      this.userService.reset();
      this.pseudoCtrl.updateValueAndValidity();
      this.pseudoCtrl.markAsTouched();
    }
    this.router.navigateByUrl('/lobby/init');
  }
}
