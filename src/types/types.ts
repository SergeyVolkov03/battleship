import { WebSocket } from 'ws';

export type Player_request = {
  name: string;
  password: string;
};

export type Player = {
  name: string;
  password: string;
  wins: number;
  id: string;
  socket: WebSocketWithID;
};

export type Message = {
  type: string;
  data: string;
  id: number;
};

export type Game = {
  gameId: string;
  players: Player[];
};

export type RoomData = {
  roomId: string;
  roomUsers: RoomUser[];
};

export type RoomUser = {
  name: string;
  index: string;
};

export type Roomrequest = {
  indexRoom: string;
};

export type WebSocketWithID = WebSocket & { playerId: string; gameId: string };
