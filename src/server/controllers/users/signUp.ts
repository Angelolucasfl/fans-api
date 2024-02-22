import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IUser } from "../../database/models";
import { UserProvider } from "../../database/providers/users";


interface IBodyProps extends Omit<IUser, "id">{}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6),
  }))
}));



export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await UserProvider.Create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};