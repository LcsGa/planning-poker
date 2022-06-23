import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { LobbyGateway } from './lobby.gateway';

@Module({
  controllers: [AppController],
  providers: [LobbyGateway]
})
export class AppModule {}
