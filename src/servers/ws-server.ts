import * as ws from 'ws';
import { app } from '../app';

export const wsServer = (port: number) => {
  const { Server } = ws;
  const server = new Server({ port: port });
  server.on('connection', app);
};
