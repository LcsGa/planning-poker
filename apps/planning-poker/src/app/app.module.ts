import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from './shared/components/header/header.module';
import { RippleModule } from 'primeng/ripple';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, BrowserModule, HeaderModule, RippleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
