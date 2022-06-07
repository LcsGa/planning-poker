import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    RouterModule,
    SidebarModule,
    ToggleButtonModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
