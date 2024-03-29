import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CommonModule } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { ReactiveFormsModule } from "@angular/forms";
import { RippleModule } from "primeng/ripple";
import { RouterModule } from "@angular/router";
import { ToastModule } from "primeng/toast";

import { LobbyCreateComponent } from "./lobby-create.component";

import { IsAuthenticatedGuard } from "../../shared/guards/is-authenticated.guard";

import { MessageService } from "primeng/api";

import { FilterPatternDirective } from "../../shared/directives/filter-pattern.directive";

@NgModule({
  declarations: [LobbyCreateComponent],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    FilterPatternDirective,
    RippleModule,
    RouterModule.forChild([
      {
        path: "",
        component: LobbyCreateComponent,
        canActivate: [IsAuthenticatedGuard],
      },
    ]),
    ToastModule,
  ],
  providers: [MessageService],
})
export class LobbyCreateModule {}
