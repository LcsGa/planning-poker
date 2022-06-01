import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from './shared/components/header/header.module';
import { RippleModule } from 'primeng/ripple';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RippleModule, HeaderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
