import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { generate as shortUuid } from "short-uuid";
import { LobbyService } from "../../shared/services/lobby.service";
import { Icon } from "../../shared/utils/icon.utils";

@Component({
  selector: "pp-lobby-create",
  templateUrl: "./lobby-create.component.html",
  styleUrls: ["./lobby-create.component.scss"],
})
export class LobbyCreateComponent implements AfterViewInit {
  public lobbyId = shortUuid().slice(0, 10);

  public readonly ICON = {
    COPY: Icon.of("copy"),
    START: Icon.of("flag-checkered"),
  };

  constructor(
    private readonly messageService: MessageService,
    private readonly lobbyService: LobbyService,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    this.lobbyService.join(this.lobbyId);
    this.copyLobbyId();
  }

  public copyLobbyId(): void {
    navigator.clipboard.writeText(this.lobbyId).then(() =>
      this.messageService.add({
        severity: "info",
        summary: "Copié !",
        closable: false,
        life: 1_000,
      })
    );
  }

  public startLobby(): void {
    this.router.navigateByUrl(`/lobby/${this.lobbyId}`);
  }
}
