import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "firstLetter",
})
export class FirstLetterPipe implements PipeTransform {
  public transform(word: string): string {
    return word[0];
  }
}
