import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IFollower } from "../../database/models";
import { FollowerProvider } from "../../database/providers/followers";


interface IBodyProps extends Omit<IFollower, "id">{}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    ArtistId: yup.number().integer().required(),
    nomeUsuario: yup.string().required().min(3),
  }))
}));



export const create = async (req: Request<{}, {}, IFollower>, res: Response) => {
  const result = await FollowerProvider.Create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};