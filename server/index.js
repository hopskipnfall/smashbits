import serverless from 'serverless-http';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import session from 'express-session';
import ConnectMongo from 'connect-mongo';
import crypto from 'crypto';
import { getMongooseConnection, queryUser, putTwitterUser } from './src/store';

import {
  getBit, getBits, getComments, createBit,
} from './src/bits';

const MongoStore = ConnectMongo(session);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: `${process.env.TWITTER_API_KEY}`,
      consumerSecret: `${process.env.TWITTER_API_SECRET_KEY}`,
      callback: `${process.env.BASE_SERVER_URL}/oauth/twitter/callback`,
    },
    (async (token, tokenSecret, profile, cb) => {
      // If the user isn't already in the DB, add them.
      const user = await queryUser({ twitterId: profile.id });
      if (!user) {
        const newUser = await putTwitterUser(profile);
        return cb(null, newUser);
      }
      return cb(null, user);
    }),
  ),
);

const app = express();
app.use(express.json()); // support encoded JSON
app.use(express.urlencoded({ extended: true })); // support encoded bodies
// Security middleware, but keep client-side caching.
app.use(
  helmet({
    noCache: {
      action: 'deny',
    },
  }),
);
app.use(
  session({
    // If the environment var wasn't set, fall back to a randomly generated secret. This will effectively log everyone out each time the server restarts.
    secret: `${process.env.SESSION_SECRET}` || crypto.randomBytes(20).toString('hex'),
    store: new MongoStore({ mongooseConnection: getMongooseConnection() }),
    cookie: { secure: false },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  queryUser({ id })
    .then(user => cb(null, user))
    .catch(e => cb(new Error('Failed to deserialize a user')));
});

app.use(
  cors({
    origin: process.env.BASE_CLIENT_URL, // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  }),
);

app.get('/bits', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  getBits(req)
    .then(result => res.send(JSON.stringify({ bits: result })))
    .catch(error => res.status(500).send(error));
});

app.post('/bits', (req, res) => {
  res.setHeader('Access-Control-Expose-Headers', 'location');
  createBit(req.body.bit)
    .then(result => res.location(`/bits/${result.postId}`).sendStatus(201))
    // TODO(#19): Don't propagate this to clients.
    .catch(error => res.status(500).send(error));
});

app.get('/bits/:bitId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  getBit(req)
    .then(result => (result
      ? res.send(JSON.stringify({ bit: result }))
      : res.status(404).send()))
    .catch(error => res.status(500).send(error));
});

app.get('/bits/:bitId/comments', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getComments(req.params)));
});

app.get('/login/twitter', passport.authenticate('twitter'));

app.get(
  '/oauth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: `${process.env.BASE_CLIENT_URL}/login?success=false`,
    successRedirect: `${process.env.BASE_CLIENT_URL}/login?success=true`,
  }),
  (req, res) => {
    res.redirect('/');
  },
);

app.get('/profile', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      // TODO(thenuge): Probably only expose the data we need to the client.
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).setHeader('WWW-Authenticate', 'Bearer').send();
  }
});

export const handler = serverless(app);
