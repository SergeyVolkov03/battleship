export type Player_request = {
  name: string;
  password: string;
};

export type Player_response = {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
};

export type Message = {
  type: string;
  data: string;
  id: number;
};
