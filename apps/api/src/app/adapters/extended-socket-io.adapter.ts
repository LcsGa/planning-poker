import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server as IoServer } from "socket.io";
import { Server as HttpsServer } from "https";

export class ExtendedSocketIoAdapter extends IoAdapter {
  protected ioServer: IoServer;

  constructor(protected server: HttpsServer) {
    super();

    this.ioServer = new IoServer(server, { cors: { origin: "*" } });
  }

  create(port: number) {
    return this.ioServer;
  }
}
