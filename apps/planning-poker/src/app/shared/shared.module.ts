import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LabelValueComponent } from "./components/label-value/label-value.component";

@NgModule({
  declarations: [LabelValueComponent],
  imports: [CommonModule],
  exports: [LabelValueComponent],
})
export class SharedModule {}
