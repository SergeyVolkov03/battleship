import { registration } from './handlers/registration';
import { Commands } from './commands/commands';
import { Message, Player_request } from './types/types';
import WebSocket from 'ws';

export function app(ws: WebSocket) {
  ws.on('error', (err) => {
    console.log(err);
  });
  ws.on('message', (data) => {
    const request = JSON.parse(data.toString()) as Message;
    if (request.type === Commands.PLAYER_AUTHORIZATION) {
      const player = JSON.parse(request.data) as Player_request;
      registration(ws, player);
    }
  });
}
