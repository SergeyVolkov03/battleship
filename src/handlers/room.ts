import { RoomData, Roomrequest, WebSocketWithID } from '../types/types';
import { db } from '../app';
import { Commands } from '../commands/commands';
import { wss } from '../servers/ws-server';

export function createRoom(ws: WebSocketWithID) {
  ws.gameId = db.createRoom();
  updateRooms();
}

export function addPlayerToRoom(ws: WebSocketWithID, data: Roomrequest) {
  ws.gameId = data.indexRoom;
  console.log('add_player_to_room', ws.gameId);
  db.addPlayerToRoom(ws.gameId, ws.playerId);
  updateRooms();
}

export function updateRooms() {
  const rooms = db.getRooms();
  const data: RoomData[] = [];
  const dataForGame: string[] = [];
  rooms.forEach((room) => {
    if (room.roomUsers.length < 2) {
      data.push({
        roomId: room.roomId,
        roomUsers: room.roomUsers.map((room) => {
          return { name: room.name, index: room.index };
        }),
      });
    } else if (room.roomUsers.length === 2) {
      dataForGame.push(...room.roomUsers.map((user) => user.index));
      db.deleteRoomById(room.roomId);
    }
  });

  wss.broadcast(
    JSON.stringify({
      type: Commands.UPDATE_ROOM,
      data: JSON.stringify(data),
    })
  );

  dataForGame.forEach((id) => {
    const ws = db.getPlayerByID(id)?.socket;
    if (ws) {
      createGame(ws);
    }
  });
}

export function createGame(ws: WebSocketWithID) {
  const response = {
    type: Commands.CREATE_GAME,
    data: JSON.stringify({
      idGame: ws.gameId,
      idPlayer: ws.playerId,
    }),
  };
  ws.send(JSON.stringify(response));
}
