import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { UserService } from "../shared/services/user.service";
import { Icon } from "../shared/utils/icon.utils";

@Component({
  selector: "pp-auth",
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule, InputTextModule, ReactiveFormsModule, RippleModule],
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  protected pseudoCtrl = new FormControl("", { nonNullable: true, validators: Validators.required });

  protected readonly ICON = {
    ARROW_RIGHT: Icon.of("chevron-right"),
    USER: Icon.of("user-astronaut"),
  };

  constructor(private readonly userService: UserService, private readonly router: Router) {}

  ngOnInit(): void {
    this.userService.initStored();
    this.userService.singleUser$.subscribe((user) => this.pseudoCtrl.setValue(user?.name ?? ""));
  }

  protected confirmPseudo(): void {
    if (this.pseudoCtrl.valid) {
      this.userService.create(this.pseudoCtrl.value);
    } else {
      this.userService.reset();
      this.pseudoCtrl.updateValueAndValidity();
      this.pseudoCtrl.markAsTouched();
    }
    this.router.navigateByUrl("/lobby/init");
  }
}
