import serverless from 'serverless-http';
import express from 'express';
import helmet from 'helmet';
import Twitter from 'node-twitter-api';
import cors from 'cors';
import { getBit, getBits, getComments, createBit } from './src/bits';

var twitter = new Twitter({
  consumerKey: 'nkoFyhVvx9BVOR7vsjv6c9EHz',
  consumerSecret: 'Be0VOmwgZ4B20i40MlmKJOAnILKjW7cj7vTcxB9Qr6omncczbe',
  callback: 'http://localhost:3000/request-token'
});
var _requestSecret;

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
      .then(result => res.send(JSON.stringify({ bits: result })))
      .catch(error => res.status(500).send(error));
});

app.post('/bits', (req, res) => {
  res.setHeader('Access-Control-Expose-Headers', 'location');
  createBit(req.body.bit)
      .then(result => res.location('/bits/' + result.postId).sendStatus(201))
      // TODO(#19): Don't propagate this to clients.
      .catch(error => res.status(500).send(error));
});

app.get('/bits/:bitId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  getBit(req)
      .then(result => result
          ? res.send(JSON.stringify({ bit: result }))
          : res.status(404).send())
      .catch(error => res.status(500).send(error));
});

app.get('/bits/:bitId/comments', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getComments(req.params)));
});

/*var corsOptions = {
  origin: 'http://localhost:3001',
};*/

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.post('/request-token', (req, res) => {
        twitter.getRequestToken((err, requestToken, requestSecret) => {
            if (err)
                res.status(500).send(err);
            else {
                _requestSecret = requestSecret;
                res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
            }
        });
    });

app.get("/access-token", (req, res) => {
      var requestToken = req.query.oauth_token,
      verifier = req.query.oauth_verifier;

        twitter.getAccessToken(requestToken, _requestSecret, verifier, (err, accessToken, accessSecret) => {
            if (err)
                res.status(500).send(err);
            else
                twitter.verifyCredentials(accessToken, accessSecret, (err, user) => {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.send(user);
                });
        });
    });

export const handler = serverless(app);
