import { randomUUID } from 'crypto';
import { Game, Player, Player_request, RoomData, WebSocketWithID } from './types/types';

export class DB {
  players: Player[] = [];
  games: Game[] = [];
  rooms: RoomData[] = [];

  addPlayerToDB(player: Player_request, ws: WebSocketWithID) {
    const playerForDB = { wins: 0, ...player, id: randomUUID(), socket: ws };
    this.players.push(playerForDB);
    return playerForDB;
  }

  getPlayers() {
    return this.players;
  }

  getPlayerByID(id: string) {
    return this.players.find((player) => player.id === id);
  }

  createRoom() {
    const roomId = randomUUID();
    this.rooms.push({
      roomId: roomId,
      roomUsers: [],
    });
    return roomId;
  }

  getRooms() {
    return this.rooms;
  }

  getRoomById(indexRoom: string) {
    return this.rooms.find((room) => room.roomId === indexRoom);
  }

  deleteRoomById(indexRoom: string) {
    this.rooms = this.rooms.filter((room) => room.roomId !== indexRoom);
  }

  addPlayerToRoom(indexRoom: string, playerId: string) {
    const room = this.getRoomById(indexRoom);
    const player = this.getPlayerByID(playerId);
    if (player) {
      room?.roomUsers.push({ index: playerId, name: player?.name });
    }
  }
}
