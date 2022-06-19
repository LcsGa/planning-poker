import { NgModule } from "@angular/core";
import { AvatarModule as PrimeAvatarModule } from "primeng/avatar";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared.module";

import { AvatarComponent } from "./avatar.component";

@NgModule({
  declarations: [AvatarComponent],
  imports: [CommonModule, PrimeAvatarModule, SharedModule],
  exports: [AvatarComponent],
})
export class AvatarModule {}
