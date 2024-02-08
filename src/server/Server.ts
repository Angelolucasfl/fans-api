import express from "express";

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

  routes() {
    this.server.use("/", (req, res) => {
      return res.json({ message: "Hello World!" });
    });
  }
}

export default new Server().server;