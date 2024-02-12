import http from 'http';
import * as dotenv from 'dotenv';
import { routesList } from './routes.js';

import * as url from 'url';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const resSend = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  if (data) {
    res.write(JSON.stringify(data));
  }
  res.end();
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname;
  req.params = parsedUrl.query;

  let chunks = [];

  req.on('data', (chunk) => {
    chunks.push(chunk);
  });

  req.on('end', () => {
    req.body = JSON.parse(Buffer.concat(chunks).toString() || '{}');

    const route = routesList[path];

    if (route) {
      return route[req.method](req, res);
    }

    resSend(res, 404, { error: 'Not Found!' });
  });
});

server.listen(PORT, () => {
  console.log(`Server started op port ${PORT}`);
});
