import { NgModule } from "@angular/core";
import { FirstLetterPipe } from "./pipes/first-letter.pipe";

@NgModule({
  declarations: [FirstLetterPipe],
  exports: [FirstLetterPipe],
})
export class SharedModule {}
