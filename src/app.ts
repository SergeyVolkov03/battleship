import { registration } from './handlers/registration';
import { Commands } from './commands/commands';
import { Message, Player_request } from './types/types';
import WebSocket from 'ws';
import { DB } from './db';

export const db = new DB();

export function app(ws: WebSocket) {
  ws.on('error', (err) => {
    console.log(err);
  });
  ws.on('message', (data) => {
    const request = JSON.parse(data.toString()) as Message;
    const player = JSON.parse(request.data) as Player_request;
    if (request.type === Commands.PLAYER_AUTHORIZATION) {
      registration(ws, player);
    }
  });
}
