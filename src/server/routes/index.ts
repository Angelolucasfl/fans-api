import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ArtistController, FollowerController, UserController } from "../controllers";
import { ensureAuth } from "../shared/middlewares";

const router = Router();

router.get("/", (_, res) => {
  return res.status(StatusCodes.OK).json({ message: "ok!" });
});

router.post("/artist", ensureAuth,
  ArtistController.createValidation,
  ArtistController.create);

router.get("/artist", ensureAuth,
  ArtistController.getAllValidation,
  ArtistController.getAll);

router.get("/artist/:id", ensureAuth,
  ArtistController.getByIdValidation,
  ArtistController.getById);

router.put("/artist/:id", ensureAuth,
  ArtistController.updateByIdValidation,
  ArtistController.updateById);

router.delete("/artist/:id", ensureAuth,
  ArtistController.deleteByIdValidation,
  ArtistController.deleteById);


router.post("/follower", ensureAuth,
  FollowerController.createValidation,
  FollowerController.create);

router.get("/follower", ensureAuth,
  FollowerController.getAllValidation,
  FollowerController.getAll);

router.get("/follower/:id", ensureAuth,
  FollowerController.getByIdValidation,
  FollowerController.getById);

router.put("/follower/:id", ensureAuth,
  FollowerController.updateByIdValidation,
  FollowerController.updateById);

router.delete("/follower/:id", ensureAuth,
  FollowerController.deleteByIdValidation,
  FollowerController.deleteById);


router.post("/entrar",
  UserController.sigInValidation,
  UserController.signIn);

router.post("/cadastrar",
  UserController.signUpValidation,
  UserController.signUp);

export { router };