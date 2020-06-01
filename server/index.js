import serverless from 'serverless-http';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import session from 'express-session';
import ConnectMongo from 'connect-mongo';
import { getMongooseConnection } from './src/store';
const MongoStore = ConnectMongo(session);

import { getBit, getBits, getComments, createBit } from './src/bits';

passport.use(
  new TwitterStrategy(
    {
      consumerKey: `${process.env.TWITTER_API_KEY}`,
      consumerSecret: `${process.env.TWITTER_API_SECRET_KEY}`,
      callback: `${process.env.BASE_SERVER_URL}/oauth/twitter/callback`,
    },
    function (token, tokenSecret, profile, cb) {
      return cb(null, profile);
    }
  )
);

var _requestSecret;

const app = express();
app.use(express.json()); // support encoded JSON
app.use(express.urlencoded({ extended: true })); // support encoded bodies
// Security middleware, but keep client-side caching.
app.use(
  helmet({
    noCache: {
      action: 'deny',
    },
  })
);
app.use(
  session({
    // TODO(thenuge): Use a better secret.
    secret: 'kirby',
    store: new MongoStore({ mongooseConnection: getMongooseConnection() }),
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// TODO(thenuge): Use the user ID from the DB.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(
  cors({
    origin: process.env.BASE_CLIENT_URL, // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.get('/bits', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  getBits(req)
    .then((result) => res.send(JSON.stringify({ bits: result })))
    .catch((error) => res.status(500).send(error));
});

app.post('/bits', (req, res) => {
  res.setHeader('Access-Control-Expose-Headers', 'location');
  createBit(req.body.bit)
    .then((result) => res.location('/bits/' + result.postId).sendStatus(201))
    // TODO(#19): Don't propagate this to clients.
    .catch((error) => res.status(500).send(error));
});

app.get('/bits/:bitId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  getBit(req)
    .then((result) =>
      result
        ? res.send(JSON.stringify({ bit: result }))
        : res.status(404).send()
    )
    .catch((error) => res.status(500).send(error));
});

app.get('/bits/:bitId/comments', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getComments(req.params)));
});

app.get('/login/twitter', passport.authenticate('twitter'));

app.get(
  '/oauth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: `${process.env.BASE_CLIENT_URL}/login?succeeded=false`,
    successRedirect: `${process.env.BASE_CLIENT_URL}/login?succeeded=true`,
  }),
  function (req, res) {
    res.redirect('/');
  }
);

app.get('/profile', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      user: req.user,
      cookies: req.cookies
    });
  } else {
    res.status(401).setHeader('WWW-Authenticate', 'Basic');
  }
});

export const handler = serverless(app);
