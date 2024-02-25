import { Commands } from '../commands/commands';
import { db } from '../app';
import { wss } from '../servers/ws-server';

export function updateWinners() {
  const players = db.getPlayers();
  const winners = players.map((player) => {
    return { name: player.name, wins: player.wins };
  });
  wss.broadcast(
    JSON.stringify({
      type: Commands.UPDATE_WINNERS,
      data: JSON.stringify(winners),
    })
  );
}
