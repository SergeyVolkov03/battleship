import { httpServer } from './servers/http-sever';
import { wsServer } from './servers/ws-server';
import 'dotenv/config';

const HTTP_PORT = Number(process.env.HTTP_PORT) || 8181;
const WS_PORT = Number(process.env.WS_PORT) || 8181;

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the http://localhost:${HTTP_PORT} port!`);

wsServer(WS_PORT);
console.log(`Start websocket server on the ws://localhost:${WS_PORT} port!`);
