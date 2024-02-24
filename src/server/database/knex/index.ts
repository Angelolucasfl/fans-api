import knex from "knex";
import pg from "pg";
import "dotenv/config";
import { development, test, production } from "./Environment";


if(process.env.NODE_ENV === "production"){
  pg.types.setTypeParser(20, "text", parseInt);
}

const getEnv = () => {
  switch(process.env.NODE_ENV){
    case "production": return production;
    case "test": return test;

    default: return development;
  }
};

export const Knex = knex(getEnv());