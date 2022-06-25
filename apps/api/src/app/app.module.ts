import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";

import { LobbyGateway } from "./lobby/lobby.gateway";

import { LobbyService } from "./lobby/lobby.service";

@Module({
  controllers: [AppController],
  providers: [LobbyGateway, LobbyService],
})
export class AppModule {}
