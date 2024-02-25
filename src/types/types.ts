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
};

export type Message = {
  type: string;
  data: string;
  id: number;
};

export type WebSocketWithID = WebSocket & { id: string };
