import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ArtistController, FollowerController } from "../controllers";

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


router.post("/follower",
  FollowerController.createValidation,
  FollowerController.create);

router.get("/follower",
  FollowerController.getAllValidation,
  FollowerController.getAll);

router.get("/follower/:id",
  FollowerController.getByIdValidation,
  FollowerController.getById);

router.put("/follower/:id",
  FollowerController.updateByIdValidation,
  FollowerController.updateById);

router.delete("/follower/:id",
  FollowerController.deleteByIdValidation,
  FollowerController.deleteById);

export { router };