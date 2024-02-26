import { Room, RoomData, WebSocketWithID } from '../types/types';
import { db } from '../app';
import { Commands } from '../commands/commands';
import { wss } from '../servers/ws-server';

export function createRoom(ws: WebSocketWithID) {
  ws.gameId = db.createGame(ws.playerId);
  const response = {
    type: Commands.CREATE_GAME,
    data: JSON.stringify({
      idGame: ws.gameId,
      idPlayer: ws.playerId,
    }),
  };
  ws.send(JSON.stringify(response));
  updateRooms();
}

export function addPlayerToRoom(ws: WebSocketWithID, data: Room) {
  const gameId = data.indexRoom;
  db.addPlayerToGame(gameId, ws.playerId);
  ws.gameId = gameId;
  const response = {
    type: Commands.CREATE_GAME,
    data: JSON.stringify({
      idGame: gameId,
      idPlayer: ws.playerId,
    }),
  };
  ws.send(JSON.stringify(response));
  updateRooms();
}

export function updateRooms() {
  const games = db.getGames();
  const data: RoomData[] = [];
  games.forEach((game) => {
    if (game.players.length < 2) {
      data.push({
        roomId: game.gameId,
        roomUsers: [
          ...game.players.map((player) => {
            return { name: player.name, index: player.id };
          }),
        ],
      });
    }
  });
  wss.broadcast(
    JSON.stringify({
      type: Commands.UPDATE_ROOM,
      data: JSON.stringify(data),
    })
  );
}
