import { Commands } from '../commands/commands';
import { db } from '../db';
import { Message, Player_request } from '../types/types';
import WebSocket from 'ws';

export function registration(ws: WebSocket, player: Player_request) {
  db.push(player);
  const response = {
    type: Commands.PLAYER_AUTHORIZATION,
    data: JSON.stringify({
      name: player.name,
      index: 1,
      error: false,
      errorText: '',
    }),
  } as Message;
  ws.send(JSON.stringify(response));
}
