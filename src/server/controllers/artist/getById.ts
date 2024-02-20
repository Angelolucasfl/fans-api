import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { ArtistProvider } from "../../database/providers/artist";
import * as yup from "yup";


interface IParamsProps {
  id: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));



export const getById = async (req: Request<IParamsProps>, res: Response) => {
  const result = await ArtistProvider.getById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};