import { RawData } from 'ws';
import { Message } from '../types/types';

export function parserRequest(request: RawData) {
  const { type, data, id } = JSON.parse(request.toString()) as Message;
  if (data) {
    const parseData = JSON.parse(data.toString());
    return { type, data: parseData, id };
  }
  return { type, data: '', id };
}
