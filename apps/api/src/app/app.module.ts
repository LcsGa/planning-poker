import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";

import { ServeStaticModule } from "@nestjs/serve-static";

import { LobbyGateway } from "./lobby/lobby.gateway";

import { LobbyService } from "./lobby/lobby.service";

import { FormatResultsPipe } from "./lobby/pipes/format-results.pipe";

import { join } from "path";

@Module({
  controllers: [AppController],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "planning-poker"),
    }),
  ],
  providers: [FormatResultsPipe, LobbyGateway, LobbyService],
})
export class AppModule {}
