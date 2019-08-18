import serverless from 'serverless-http';
import express from 'express';
import helmet from 'helmet';
import { getBits, getComments, createBit } from './src/bits';

const app = express();
app.use(express.json()); // support encoded JSON
app.use(express.urlencoded({ extended: true })); // support encoded bodies
// Security middleware, but keep client-side caching.
app.use(helmet({
  noCache: {
    action: 'deny'
  }
}));

app.get('/bits', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  getBits(req)
      .then(result => res.send(JSON.stringify(result.map(record => record._doc))))
      .catch(error => res.status(500).send(error));
});

app.post('/bits', (req, res) => {
  res.setHeader('Access-Control-Expose-Headers', 'location');
  createBit(req.body.bit)
      .then(result => res.location('/bits/' + result.postId).sendStatus(201))
      // TODO(#19): Don't propagate this to clients.
      .catch(error => res.status(500).send(error));
});

app.get('/bits/:bitId/comments', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getComments(req.params)));
});

export const handler = serverless(app);
