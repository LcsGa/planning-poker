import { Component } from '@angular/core';
import { Icon } from '../../utils/icon.utils';

@Component({
  selector: 'pp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public readonly ICON = {
    SUN: Icon.of('sun'),
    MOON: Icon.of('moon'),
    MENU: Icon.of('bars'),
  };

  public display = false;

  public readonly THEME = {
    LIGHT: 'clair',
    DARK: 'sombre',
  };

  public theme = this.THEME.DARK;

  public switchTheme(): void {
    this.theme =
      this.theme === this.THEME.DARK ? this.THEME.LIGHT : this.THEME.DARK;
  }
}
