import serverless from 'serverless-http';
import express from 'express';
import getBits from './src/store';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/bits', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getBits()));
});

export const handler = serverless(app);
