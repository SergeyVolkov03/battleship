import { httpServer } from './servers/http-sever';
import { wss } from './servers/ws-server';
import 'dotenv/config';

const HTTP_PORT = Number(process.env.HTTP_PORT) || 8181;

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the http://localhost:${HTTP_PORT} port!`);

console.log(`Start websocket server on the ws://localhost:${wss.getPort()} port!`);
