import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { User } from "@planning-poker/shared";
import { AvatarModule as PrimeAvatarModule } from "primeng/avatar";
import { map } from "rxjs";
import { FirstLetterPipe } from "../../pipes/first-letter.pipe";
import { UserService } from "../../services/user.service";
import { Icon } from "../../utils/icon.utils";

@Component({
  selector: "pp-avatar[user]",
  standalone: true,
  imports: [CommonModule, PrimeAvatarModule, FirstLetterPipe],
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent {
  @Input()
  public user!: User;

  protected readonly ICON = {
    CROWN: Icon.of("crown"),
  };

  protected readonly myId$ = this.userService.singleUser$.pipe(map((user) => user!.id));

  constructor(private readonly userService: UserService) {}

  protected get background(): string {
    return `rgb(${this.user.color.r}, ${this.user.color.g}, ${this.user.color.b})`;
  }

  protected get color(): string {
    const grayScale = Object.values(this.user.color).reduce((acc, cur) => acc + cur) / 3;
    return `var(--bluegray-${grayScale <= 255 / 2 ? 50 : 900})`;
  }
}
