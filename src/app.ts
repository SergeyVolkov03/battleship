import { registration } from './handlers/registration';
import { Commands } from './commands/commands';
import { WebSocketWithID } from './types/types';
import { DB } from './db';
import { parserRequest } from './helpers/parser';

export const db = new DB();

export function app(ws: WebSocketWithID) {
  ws.on('error', (err) => {
    console.log(err);
  });
  ws.on('message', (request) => {
    const { type, data } = parserRequest(request);
    switch (type) {
      case Commands.PLAYER_AUTHORIZATION:
        registration(ws, data);
        break;
      case Commands.CREATE_ROOM:
        console.log(request);
        console.log(ws.id);
        break;
    }
  });
}
