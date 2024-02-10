import express from "express";
import { router } from "./routes";
import "dotenv/config";

export class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes(): void {
    this.server.use(router);
  }
}

export default new Server().server;