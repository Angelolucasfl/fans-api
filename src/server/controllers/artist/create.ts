import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IArtist } from "../../database/models";
import { ArtistProvider } from "../../database/providers/artist";


interface IBodyProps extends Omit<IArtist, "id">{}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(1).max(255),
  }))
}));



export const create = async (req: Request<{}, {}, IArtist>, res: Response) => {
  const result = await ArtistProvider.Create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};