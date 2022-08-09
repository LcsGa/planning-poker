import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server as ioServer } from "socket.io";
import { Server as httpsServer } from "https";

export class ExtendedSocketIoAdapter extends IoAdapter {
  protected ioServer: ioServer;

  constructor(protected server: httpsServer) {
    super();

    this.ioServer = new ioServer(server, { cors: { origin: "*" } });
  }

  create(port: number) {
    return this.ioServer;
  }
}
