import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";


interface IArtist {
  nome: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IArtist>(yup.object().shape({
    nome: yup.string().required().min(1)
  }))
}));



export const create = async (req: Request<{}, {}, IArtist>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
};