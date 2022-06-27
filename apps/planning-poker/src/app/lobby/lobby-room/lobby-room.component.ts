import { Component, OnDestroy } from "@angular/core";
import { SimpleUser, UserEvent } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { take, tap } from "rxjs/operators";
import { UserService } from "../../shared/services/user.service";

@Component({
  selector: "pp-lobby-room",
  templateUrl: "./lobby-room.component.html",
  styleUrls: ["./lobby-room.component.scss"],
})
export class LobbyRoomComponent implements OnDestroy {
  public readonly cards = [
    { points: "0" as const, isSelected: false },
    { points: "demi" as const, isSelected: false },
    { points: "1" as const, isSelected: false },
    { points: "2" as const, isSelected: false },
    { points: "3" as const, isSelected: false },
    { points: "5" as const, isSelected: false },
    { points: "8" as const, isSelected: false },
    { points: "13" as const, isSelected: false },
    { points: "20" as const, isSelected: false },
    { points: "40" as const, isSelected: false },
    { points: "100" as const, isSelected: false },
    { points: "question" as const, isSelected: false },
    { points: "coffee" as const, isSelected: false },
  ];

  constructor(private readonly userService: UserService, private readonly socket: Socket) {}

  ngOnDestroy(): void {
    this.userService.user$
      .pipe(
        take(1),
        tap((user) => this.socket.emit(UserEvent.DISCONNECT, user))
      )
      .subscribe();
  }

  public selectCard(points: string): void {
    this.cards.forEach((card) => (card.isSelected = card.points === points && !card.isSelected));
  }
}
