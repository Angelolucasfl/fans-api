import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";


interface IArtist {
  nome: string;
}

interface IFilter {
  filter: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IArtist>(yup.object().shape({
    nome: yup.string().required().min(1)
  })),

  query: getSchema<IFilter>(yup.object().shape({
    filter: yup.string().required().min(3)
  }))
}));


export const create = async (req: Request<{}, {}, IArtist>, res: Response) => {
  console.log(req.body);

  return res.send("created");
};