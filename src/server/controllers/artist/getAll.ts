import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { ArtistProvider } from "../../database/providers/artist";
import * as yup from "yup";


interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    filter: yup.string().optional(),
  }))
}));



export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const results = await ArtistProvider.GetAll(req.query.page || 1, req.query.limit || 10, req.query.filter || "", Number(req.query.id));
  const count = await ArtistProvider.Count(req.query.filter);

  if (results instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: results.message
      }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message
      }
    });
  }
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(results);
};