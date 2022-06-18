import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToggleButtonModule } from "primeng/togglebutton";

import { MenuComponent } from "./menu.component";

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, ToggleButtonModule],
  exports: [MenuComponent],
})
export class MenuModule {}
