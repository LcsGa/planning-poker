import { NgModule } from "@angular/core";
import { AvatarModule } from "../avatar/avatar.module";
import { CommonModule } from "@angular/common";
import { DividerModule } from "primeng/divider";
import { ToggleButtonModule } from "primeng/togglebutton";

import { MenuComponent } from "./menu.component";

@NgModule({
  declarations: [MenuComponent],
  imports: [AvatarModule, CommonModule, DividerModule, ToggleButtonModule],
  exports: [MenuComponent],
})
export class MenuModule {}
