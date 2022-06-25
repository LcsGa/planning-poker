import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderModule } from "./shared/components/header/header.module";
import { RippleModule } from "primeng/ripple";
import { RouterModule } from "@angular/router";
import { SocketIoModule } from "ngx-socket-io";

import { AppComponent } from "./app.component";

import { routes } from "./app.routes";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HeaderModule,
    RippleModule,
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot({ url: "ws://localhost:3000" }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
