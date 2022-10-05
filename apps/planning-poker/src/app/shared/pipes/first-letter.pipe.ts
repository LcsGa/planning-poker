import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "firstLetter",
  standalone: true,
})
export class FirstLetterPipe implements PipeTransform {
  public transform(word: string): string {
    return word[0];
  }
}
