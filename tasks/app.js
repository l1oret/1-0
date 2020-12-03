import cron from 'cron';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import socket from 'socket.io';

import dateUtils from './utils/dateUtils.js';
import { resultsTask } from './tasks.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', () => {
  console.log('[1-0]', 'User connected');
});

server.listen(process.env.APP_PORT, () =>
  console.log('[1-0]', `Listening on ${process.env.APP_PORT}`)
);

new cron.CronJob('0 */30 * * * *', function () {
  console.info('[1-0]', new Date());
  resultsTask.runByDate(dateUtils.getCurrentDate());
}).start();

export { app, io };
