import mongoose from 'mongoose';

let db: mongoose.Connection;

export const connect = () => {
  if (db) return;

  mongoose.connect(process.env.STORE_URI!);
  db = mongoose.connection;

  db.once('open', async () => {
    console.log('Connected to database');
  });

  db.on('error', () => {
    console.log('Error connecting to database');
  });
};

export const disconnect = () => {
  if (!db) return;

  mongoose.disconnect();
};

export const getConnection = (): mongoose.Connection => db;
