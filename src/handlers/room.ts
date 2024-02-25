import { Room, WebSocketWithID } from '../types/types';
import { db } from '../app';
import { Commands } from '../commands/commands';
import { wss } from '../servers/ws-server';

export function createRoom(ws: WebSocketWithID) {
  ws.gameId = db.createGame(ws.playerId);
  console.log(ws.gameId);
  const response = {
    type: Commands.CREATE_GAME,
    data: JSON.stringify({
      idGame: ws.gameId,
      idPlayer: ws.playerId,
    }),
  };
  ws.send(JSON.stringify(response));
  updateRooms(ws);
}

export function addPlayerToRoom(ws: WebSocketWithID, data: Room) {
  const gameId = data.indexRoom;
  console.log('indexRomm', data.indexRoom);
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
  updateRooms(ws);
}

export function updateRooms(ws: WebSocketWithID) {
  const gameId = ws.gameId;
  const roomPlayers = db.getGameById(gameId)?.players.map((player) => {
    return { name: player.name, index: player.id };
  });
  const data = {
    roomId: gameId,
    roomUsers: roomPlayers,
  };
  wss.broadcast(
    JSON.stringify({
      type: Commands.UPDATE_ROOM,
      data: JSON.stringify(data),
    })
  );
}
