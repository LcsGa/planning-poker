import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ToggleButtonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
