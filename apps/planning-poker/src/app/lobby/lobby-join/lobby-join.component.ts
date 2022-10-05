import { CommonModule } from "@angular/common";
import { AfterViewInit, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { filter, from } from "rxjs";
import { LobbyService } from "../../shared/services/lobby.service";
import { Icon } from "../../shared/utils/icon.utils";

@Component({
  selector: "pp-lobby-join",
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule, InputTextModule, ReactiveFormsModule, RippleModule],
  templateUrl: "./lobby-join.component.html",
  styleUrls: ["./lobby-join.component.scss"],
})
export class LobbyJoinComponent implements AfterViewInit {
  protected lobbyIdCtrl = new FormControl("", {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(this.lobbyService.ID_PATTERN)],
  });

  protected readonly ICON = {
    PASTE: Icon.of("paste"),
    JOIN: Icon.of("person-walking-arrow-right"),
  };

  constructor(private readonly lobbyService: LobbyService, private readonly router: Router) {}

  ngAfterViewInit(): void {
    this.pasteLobbyId();
  }

  protected pasteLobbyId(): void {
    from(navigator.clipboard.readText())
      .pipe(filter((text) => this.lobbyService.ID_PATTERN.test(text)))
      .subscribe({ next: (text) => this.lobbyIdCtrl.setValue(text), error: console.error });
  }

  protected joinLobby(): void {
    if (this.lobbyIdCtrl.valid) {
      this.lobbyService
        .joinOnce$(this.lobbyIdCtrl.value)
        .subscribe(({ state }) =>
          this.router.navigateByUrl(`/lobby/${this.lobbyIdCtrl.value}${state !== "pending" ? "/" + state : ""}`)
        );
    } else {
      this.lobbyIdCtrl.updateValueAndValidity();
      this.lobbyIdCtrl.markAsTouched();
    }
  }
}
