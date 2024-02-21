import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IFollower } from "../../database/models";
import * as yup from "yup";
import { FollowerProvider } from "../../database/providers/followers";


interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<IFollower, "id">{}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),

  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    ArtistId: yup.number().integer().required().moreThan(0),
    nomeUsuario: yup.string().required().min(3),
  }))
}));



export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro id é obrigatório"
      }
    });
  }
  const result = await FollowerProvider.UpdateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};