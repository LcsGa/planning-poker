import { Component, Input } from "@angular/core";

@Component({
  selector: "pp-label-value[label][value]",
  template: `
    <div class="flex justify-between">
      <p class="font-bold">{{ label }}</p>

      <p [style.color]="'var(--text-color-secondary)'">{{ value | number: "1.0-3" }}</p>
    </div>
  `,
})
export class LabelValueComponent {
  @Input()
  public label!: string;

  @Input()
  public value!: number;
}
