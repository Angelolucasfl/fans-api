import express from "express";
import "./shared/services/translations.yup";
import "dotenv/config";
import { router } from "./routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";
import path from "path";


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
    this.server.get("/api-docs-ui/swagger-ui.css", (req, res) => {
      res.setHeader("Content-Type", "text/css");
      res.sendFile(path.join(__dirname, "public/swagger-ui.css"));
    });

    this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  routes(): void {
    this.server.use(router);
  }
}

export default new Server().server;