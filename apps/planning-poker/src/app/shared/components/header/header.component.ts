import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Icon } from "../../utils/icon.utils";

@Component({
  selector: "pp-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  protected readonly ICON = {
    MENU: Icon.of("bars"),
  };

  protected readonly displayMenu$$ = new BehaviorSubject(false);
}
