import { Player, Player_request } from './types/types';

export class DB {
  players: Player[] = [];

  addPlayerToDB(player: Player_request) {
    this.players.push({ wins: 0, ...player });
  }

  getPlayers() {
    return this.players;
  }

  createPlayerINdex() {
    return this.players.length;
  }
}
