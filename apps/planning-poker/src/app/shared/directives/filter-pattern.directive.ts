import { Directive, ElementRef, Input } from "@angular/core";
import { filter, fromEvent } from "rxjs";

@Directive({ selector: "[filterPattern]", standalone: true })
export class FilterPatternDirective {
  @Input()
  public filterPattern!: RegExp;

  private readonly UTILITY_KEYS = [
    "Escape",
    "Backspace",
    "Delete",
    "Tab",
    "Enter",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "Insert",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
  ];

  constructor(el: ElementRef<HTMLInputElement>) {
    fromEvent<KeyboardEvent>(el.nativeElement, "keydown")
      .pipe(filter(({ key, code }) => !this.filterPattern.test(key) && !this.UTILITY_KEYS.includes(code)))
      .subscribe((e) => e.preventDefault());
  }
}
