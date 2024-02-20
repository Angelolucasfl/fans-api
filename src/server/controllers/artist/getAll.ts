import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { ArtistProvider } from "../../database/providers/artist";
import * as yup from "yup";


interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  }))
}));



export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 1);
  const results = await ArtistProvider.getAll();

  if (results instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: results.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(results);
};