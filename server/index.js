import serverless from "serverless-http";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import TwitterStrategy from "passport-twitter";
import session from "express-session";
import ConnectMongo from "connect-mongo";
import { getMongooseConnection } from "./src/store";
const MongoStore = ConnectMongo(session);

import { getBit, getBits, getComments, createBit } from "./src/bits";

console.log(
  "did base urls work?",
  process.env.BASE_CLIENT_URL,
  process.env.BASE_SERVER_URL
);

passport.use(
  new TwitterStrategy(
    {
      // @TODO - rotate these when you take them out of the codebase
      consumerKey: "nkoFyhVvx9BVOR7vsjv6c9EHz",
      consumerSecret: "Be0VOmwgZ4B20i40MlmKJOAnILKjW7cj7vTcxB9Qr6omncczbe",
      // @TODO - maybe need fully formed url here?
      callback: `${process.env.BASE_SERVER_URL}/oauth/twitter/callback`,
    },
    function (token, tokenSecret, profile, cb) {
      // whatever gets returned from these strategies like _is_ the user object...
      // so you either wanna a) look up the person in your users table based on their twitter id
      // and return that.. (or make a new user if you've never seen them before)
      // or have a function like "okay if it's twtiter, we're going to convert this twitter profiel on the fly
      // into a smash bits user object th at has the data we want... then for google do the same , and it's all on the fly
      // and on ly in session storeage (which you should treat as cache not db)
      // TODO(thenuge): Associate the Twitter profile with a user in the DB.
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
      action: "deny",
    },
  })
);
app.use(
  session({
    secret: "kirby",
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
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.get("/bits", (req, res) => {
  console.log("do we have a user!?", req.user);
  res.setHeader("Content-Type", "application/json");
  getBits(req)
    .then((result) => res.send(JSON.stringify({ bits: result })))
    .catch((error) => res.status(500).send(error));
});

app.post("/bits", (req, res) => {
  res.setHeader("Access-Control-Expose-Headers", "location");
  createBit(req.body.bit)
    .then((result) => res.location("/bits/" + result.postId).sendStatus(201))
    // TODO(#19): Don't propagate this to clients.
    .catch((error) => res.status(500).send(error));
});

app.get("/bits/:bitId", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  getBit(req)
    .then((result) =>
      result
        ? res.send(JSON.stringify({ bit: result }))
        : res.status(404).send()
    )
    .catch((error) => res.status(500).send(error));
});

app.get("/bits/:bitId/comments", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(getComments(req.params)));
});

app.get("/login/twitter", passport.authenticate("twitter"), (req, res) =>
  console.log("Login req cookie: " + req.headers.cookie)
);

app.get(
  "/oauth/twitter/callback",
  function (req, res, next) {
    console.log("got some shit from twitta");
    console.log(req.params);
    next();
  },
  passport.authenticate("twitter", {
    failureRedirect: "/login?why=twitter_auth_failed",
    successRedirect: `${process.env.BASE_CLIENT_URL}`,
  }),
  function (req, res) {
    console.log("Callback cookie: " + req.headers.cookie);
    res.redirect("/");
  }
);

export const handler = serverless(app);
