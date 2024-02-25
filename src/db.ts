import { randomUUID } from 'crypto';
import { Player, Player_request } from './types/types';

export class DB {
  players: Player[] = [];

  addPlayerToDB(player: Player_request) {
    const playerForDB = { wins: 0, ...player, id: randomUUID() };
    this.players.push(playerForDB);
    return playerForDB;
  }

  getPlayers() {
    return this.players;
  }

  getPlayerByID(id: string) {
    return this.players.find((player) => player.id === id);
  }
}
