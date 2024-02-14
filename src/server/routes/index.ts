import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ArtistController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
  return res.status(StatusCodes.OK).json({ message: "ok!" });
});

router.post("/artist",
  ArtistController.createValidation,
  ArtistController.create);

router.get("/artist",
  ArtistController.getAllValidation,
  ArtistController.getAll);

router.get("/artist/:id",
  ArtistController.getByIdValidation,
  ArtistController.getById);

router.put("/artist/:id",
  ArtistController.updateByIdValidation,
  ArtistController.updateById);

router.delete("/artist/:id",
  ArtistController.deleteByIdValidation,
  ArtistController.deleteById);

export { router };