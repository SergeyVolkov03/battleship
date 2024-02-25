import { Commands } from '../commands/commands';
import { db } from '../app';
import { Message, Player_request, WebSocketWithID } from '../types/types';
import { updateWinners } from './winners';

export function registration(ws: WebSocketWithID, player: Player_request) {
  const playerFromDB = db.addPlayerToDB(player);
  const response = {
    type: Commands.PLAYER_AUTHORIZATION,
    data: JSON.stringify({
      name: playerFromDB.name,
      index: playerFromDB.id,
      error: false,
      errorText: '',
    }),
  } as Message;
  ws.id = playerFromDB.id;
  ws.send(JSON.stringify(response));
  updateWinners();
}
