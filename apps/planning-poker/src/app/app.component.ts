import { Component, OnInit } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { ThemeService } from "./shared/services/theme.service";

@Component({
  selector: "pp-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig, private readonly themeService: ThemeService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.themeService.init();
  }
}
