import { Component, Input } from "@angular/core";
import { User } from "@planning-poker/shared";
import { UserService } from "../../services/user.service";
import { Icon } from "../../utils/icon.utils";

@Component({
  selector: "pp-avatar[user]",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent {
  @Input()
  public user!: User;

  public readonly ICON = {
    CROWN: Icon.of("crown"),
  };

  public readonly myId = this.userService.userId;

  constructor(private readonly userService: UserService) {}

  public get background(): string {
    return `rgb(${this.user.color.r}, ${this.user.color.g}, ${this.user.color.b})`;
  }

  public get color(): string {
    const grayScale = Object.values(this.user.color).reduce((acc, cur) => acc + cur) / 3;
    return `var(--bluegray-${grayScale <= 255 / 2 ? 50 : 900})`;
  }
}
