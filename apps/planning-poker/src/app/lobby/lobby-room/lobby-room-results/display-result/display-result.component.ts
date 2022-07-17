import { Component, Input } from "@angular/core";

@Component({
  selector: "pp-display-result[label][value]",
  template: `
    <div class="flex justify-between">
      <p class="font-bold">{{ label }}</p>

      <p [style.color]="'var(--text-color-secondary)'">{{ value | number: "1.0-3" }}</p>
    </div>
  `,
})
export class DisplayResultComponent {
  @Input()
  public label!: string;

  @Input()
  public value!: number;
}
