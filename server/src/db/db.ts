import * as Mongoose from 'mongoose';

let db: Mongoose.Connection;

export const connect = () => {
  if (db) return;

  Mongoose.connect(process.env.STORE_URI!);
  db = Mongoose.connection;

  db.once('open', async () => {
    console.log('Connected to database');
  });

  db.on('error', () => {
    console.log('Error connecting to database');
  });
};

export const disconnect = () => {
  if (!db) return;

  Mongoose.disconnect();
};

export const getConnection = (): Mongoose.Connection => db;
