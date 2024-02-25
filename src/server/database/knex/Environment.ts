/* eslint-disable @typescript-eslint/no-explicit-any */
import { Knex }  from "knex";
import path from "path";

export const development: Knex.Config = {
  client: "sqlite3",  
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "..", "..", "..", "..", "database.sqlite")
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    }
  }
};

export const test: Knex.Config = {
  ...development,
  connection: ":memory:",
};

export const production: Knex.Config = {
  client: "pg",  
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT || 5432 ),
    ssl: {rejectUnauthorized: false},
  },
};