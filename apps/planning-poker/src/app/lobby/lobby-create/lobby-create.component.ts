import { CommonModule } from "@angular/common";
import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { generate as shortUuid } from "short-uuid";
import { LobbyService } from "../../shared/services/lobby.service";
import { Icon } from "../../shared/utils/icon.utils";

@Component({
  selector: "pp-lobby-create",
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule, InputTextModule, RippleModule, ToastModule],
  templateUrl: "./lobby-create.component.html",
  styleUrls: ["./lobby-create.component.scss"],
})
export class LobbyCreateComponent implements AfterViewInit {
  protected lobbyId = shortUuid().slice(0, 10);

  protected readonly ICON = {
    COPY: Icon.of("copy"),
    START: Icon.of("flag-checkered"),
  };

  constructor(
    private readonly messageService: MessageService,
    private readonly lobbyService: LobbyService,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    this.lobbyService.joinOnce$(this.lobbyId).subscribe();
    this.copyLobbyId();
  }

  protected copyLobbyId(): void {
    navigator.clipboard.writeText(this.lobbyId).then(() =>
      this.messageService.add({
        severity: "info",
        summary: "Copié !",
        closable: false,
        life: 1_000,
      })
    );
  }

  protected startLobby(): void {
    this.router.navigateByUrl(`/lobby/${this.lobbyId}`);
  }
}
