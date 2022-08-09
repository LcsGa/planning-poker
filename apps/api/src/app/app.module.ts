import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { AppController } from "./app.controller";

import { ServeStaticModule } from "@nestjs/serve-static";

import { LobbyGateway } from "./lobby/lobby.gateway";

import { LobbyService } from "./lobby/lobby.service";

import { FormatResultsPipe } from "./lobby/pipes/format-results.pipe";

import { join } from "path";
import { HttpRedirectMiddleware } from "./middlewares/http-redirect.middleware";

@Module({
  controllers: [AppController],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "planning-poker"),
    }),
  ],
  providers: [FormatResultsPipe, LobbyGateway, LobbyService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRedirectMiddleware).forRoutes("*");
  }
}
