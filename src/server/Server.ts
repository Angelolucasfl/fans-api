import express from "express";
import "./shared/services/translations.yup";
import "dotenv/config";
import { router } from "./routes";
import cors from "cors";


export class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.server.use(cors({
      origin: process.env.ENABLED_CORS?.split(";") || []
    }));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes(): void {
    this.server.use(router);
  }
}

export default new Server().server;