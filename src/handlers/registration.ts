import { Commands } from '../commands/commands';
import { db } from '../app';
import { Player_request, WebSocketWithID } from '../types/types';
import { updateWinners } from './winners';
import { updateRooms } from './room';

export function registration(ws: WebSocketWithID, player: Player_request) {
  const playerFromDB = db.addPlayerToDB(player, ws);
  const response = {
    type: Commands.PLAYER_AUTHORIZATION,
    data: JSON.stringify({
      name: playerFromDB.name,
      index: playerFromDB.id,
      error: false,
      errorText: '',
    }),
  };
  ws.playerId = playerFromDB.id;
  ws.send(JSON.stringify(response));
  updateWinners();
  updateRooms();
}
