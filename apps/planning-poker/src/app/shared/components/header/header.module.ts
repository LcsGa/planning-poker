import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { MenuModule } from "../menu/menu.module";
import { RippleModule } from "primeng/ripple";
import { RouterModule } from "@angular/router";
import { SidebarModule } from "primeng/sidebar";

import { HeaderComponent } from "./header.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ButtonModule, MenuModule, RippleModule, RouterModule, SidebarModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
