import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";

import { LobbyGateway } from "./lobby/lobby.gateway";

import { LobbyService } from "./lobby/lobby.service";

import { FormatResultsPipe } from "./lobby/pipes/format-results.pipe";

@Module({
  controllers: [AppController],
  providers: [FormatResultsPipe, LobbyGateway, LobbyService],
})
export class AppModule {}
