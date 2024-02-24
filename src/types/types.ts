export type Player_request = {
  name: string;
  password: string;
};

export type Player = {
  name: string;
  password: string;
  wins: number;
};

export type Message = {
  type: string;
  data: string;
  id: number;
};
