import { Commands } from '../commands/commands';
import { db } from '../app';
import { Message, Player_request } from '../types/types';
import WebSocket from 'ws';
import { updateWinners } from './winners';

export function registration(ws: WebSocket, player: Player_request) {
  db.addPlayerToDB(player);
  const response = {
    type: Commands.PLAYER_AUTHORIZATION,
    data: JSON.stringify({
      name: player.name,
      index: db.createPlayerINdex(),
      error: false,
      errorText: '',
    }),
  } as Message;
  ws.send(JSON.stringify(response));
  updateWinners(ws);
}
