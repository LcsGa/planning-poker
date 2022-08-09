import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import { readFileSync } from "fs";
import { createServer } from "http";
import { createServer as createHttpsServer } from "https";
import { ExtendedSocketIoAdapter } from "./app/adapters/extended-socket-io.adapter";
import { join } from "path";

import { AppModule } from "./app/app.module";

const httpsOptions = {
  key: readFileSync(join("/root/planning-poker/secrets/private-key.pem")),
  cert: readFileSync(join("/root/planning-poker/secrets/public-certificate.pem")),
};

async function bootstrap() {
  const globalPrefix = "api";
  const server = express();
  const httpsServer = createHttpsServer(httpsOptions);

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix(globalPrefix);
  app.useWebSocketAdapter(new ExtendedSocketIoAdapter(httpsServer));
  app.init();

  createServer(server).listen(80);
  httpsServer.listen(443);
}

bootstrap();
