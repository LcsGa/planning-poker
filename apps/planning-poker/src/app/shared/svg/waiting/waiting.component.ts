import { Component } from "@angular/core";

@Component({
  selector: "pp-waiting",
  standalone: true,
  templateUrl: "./waiting.component.svg",
  styles: [
    `
      svg {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        color: var(--primary-color);
      }
    `,
  ],
})
export class WaitingComponent {}
