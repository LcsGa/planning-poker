import { Component } from '@angular/core';
import { Icon } from '../shared/utils/icon.utils';

@Component({
  selector: 'pp-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent {
  public readonly ICON = {
    ARROW_RIGHT: Icon.of('chevron-right'),
    USER: Icon.of('user-astronaut'),
  };
}
