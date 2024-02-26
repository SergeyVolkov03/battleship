import * as ws from 'ws';
import { app } from '../app';
import 'dotenv/config';

const WS_PORT = Number(process.env.WS_PORT) || 3000;
class WSServer {
  private port: number;
  private server: ws.Server;

  constructor(port: number) {
    const { Server } = ws;
    this.port = port;
    this.server = new Server({ port: this.port });
    this.server.on('connection', app);
  }

  public getServer() {
    return this.server;
  }

  public getPort() {
    return this.port;
  }

  public broadcast(message: string) {
    this.server.clients.forEach((client) => {
      client.send(message);
    });
  }
}

export const wss = new WSServer(WS_PORT);
