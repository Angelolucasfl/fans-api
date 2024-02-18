import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IArtist } from "../../database/models";


interface IBodyProps extends Omit<IArtist, "id">{}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(1)
  }))
}));



export const create = async (req: Request<{}, {}, IArtist>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);
};