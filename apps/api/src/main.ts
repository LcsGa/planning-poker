import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import { readFileSync } from "fs";
import { createServer } from "http";
import { createServer as createHttpsServer } from "https";
import path = require("path");

import { AppModule } from "./app/app.module";

const httpsOptions = {
  key: readFileSync(path.join("/root/planning-poker/secrets/private-key.pem")),
  cert: readFileSync(path.join("/root/planning-poker/secrets/public-certificate.pem")),
};

async function bootstrap() {
  const globalPrefix = "api";
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix(globalPrefix);
  app.init();

  createServer(server).listen(80);
  createHttpsServer(httpsOptions, server).listen(443);
}

bootstrap();
