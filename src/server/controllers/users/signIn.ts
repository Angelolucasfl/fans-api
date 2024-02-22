import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IUser } from "../../database/models";
import { UserProvider } from "../../database/providers/users";


interface IBodyProps extends Omit<IUser, "id" | "nome">{}

export const sigInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6),
  }))
}));



export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body;

  const result = await UserProvider.GetByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos"
      }
    });
  }

  if(senha !== result.senha){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos"
      }
    });
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: "teste.teste.test" });
  }
};