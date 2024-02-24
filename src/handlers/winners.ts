import WebSocket from 'ws';
import { Commands } from '../commands/commands';
import { db } from '../app';

export function updateWinners(ws: WebSocket) {
  const players = db.getPlayers();
  const winners = players.map((player) => {
    return { name: player.name, wins: player.wins };
  });
  ws.send(
    JSON.stringify({
      type: Commands.UPDATE_WINNERS,
      data: JSON.stringify(winners),
    })
  );
}
