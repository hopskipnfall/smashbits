import serverless from 'serverless-http';
import express from 'express';
import helmet from 'helmet';
import { getBits, createBit } from './src/store';

const app = express();
app.use(express.json()); // support encoded JSON
app.use(express.urlencoded({ extended: true })); // support encoded bodies
// Security middlewhere, but keep client-side caching.
app.use(helmet({
  noCache: {
    action: 'deny'
  }
}));

app.get('/bits', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getBits()));
});

app.post('/bits', (req, res) => {
  createBit(req.body.bit)
      .then(result => res.location('/bits/' + result.postId).sendStatus(201))
      .catch(error => res.status(500).send(error));
})

export const handler = serverless(app);
