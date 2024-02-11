import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes"; 
import * as yup from "yup";


interface IArtist {
  nome: string;
}

const bodyValidation: yup.Schema<IArtist> = yup.object().shape({
  nome: yup.string().required().min(1)
});


export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try{
    await bodyValidation.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};



export const create = async (req: Request<{}, {}, IArtist>, res: Response) => {
  console.log(req.body);

  return res.send("created");
};