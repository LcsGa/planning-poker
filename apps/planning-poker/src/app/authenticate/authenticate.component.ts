import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { UserService } from '../shared/services/user.service';
import { Icon } from '../shared/utils/icon.utils';

@Component({
  selector: 'pp-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {
  public pseudoCtrl!: FormControl;

  public readonly ICON = {
    ARROW_RIGHT: Icon.of('chevron-right'),
    USER: Icon.of('user-astronaut'),
  };

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchStoredUser();
    this.userService.user$
      .pipe(
        take(1),
        tap(
          (user) =>
            (this.pseudoCtrl = new FormControl(user?.name, Validators.required))
        )
      )
      .subscribe();
  }

  public confirmPseudo(): void {
    if (this.pseudoCtrl.valid) {
      this.userService.createUser(this.pseudoCtrl.value);
    }
  }
}
