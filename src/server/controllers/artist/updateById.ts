import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IArtist } from "../../database/models";
import * as yup from "yup";


interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<IArtist, "id">{
  nome: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  })),

  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(1)
  }))
}));



export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: "Registro não encontrado!"
    }
  });

  return res.status(StatusCodes.NO_CONTENT).send();
};