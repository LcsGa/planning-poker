import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthenticateComponent } from './authenticate.component';

@NgModule({
  declarations: [AuthenticateComponent],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AuthenticateComponent }]),
  ],
})
export class AuthenticateModule {}
