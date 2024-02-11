import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ArtistController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
  return res.status(StatusCodes.OK).json({ message: "ok!" });
});

router.post("/artist", ArtistController.create);


export { router };