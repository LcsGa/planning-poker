import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FirstLetterPipe } from "./pipes/first-letter.pipe";

import { LabelValueComponent } from "./components/label-value/label-value.component";

@NgModule({
  declarations: [FirstLetterPipe, LabelValueComponent],
  imports: [CommonModule],
  exports: [FirstLetterPipe, LabelValueComponent],
})
export class SharedModule {}
