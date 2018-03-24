import serverless from 'serverless-http';
import express from 'express';
import { getBits, getComments } from './src/store';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/bits', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getBits()));
});

app.get('/bits/:bitId/comments', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getComments(req.params)));
});


export const handler = serverless(app);
