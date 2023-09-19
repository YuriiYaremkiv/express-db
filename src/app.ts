import express, { Express } from "express";
import { Server } from "http";
import dotenv from "dotenv";
import { DBService } from "./database/db.service";
dotenv.config();

export class App {
  app: Express;
  server!: Server;
  port: number;
  dbService: DBService;

  constructor() {
    this.app = express();
    this.port = 8000;
    this.dbService = new DBService();
  }

  useRoutes(): void {
    this.app.use("/", (req, res, next) => res.send("Hello!!!"));
  }

  public async init(): Promise<void> {
    this.useRoutes();
    await this.dbService.connect();
    this.server = this.app.listen(this.port, () => {
      console.log(`Server Port: ${this.port}`);
    });
  }
}
