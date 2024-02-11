import { Request, Response } from "express";
// import { StatusCodes } from "http-status-codes"; 
import * as yup from "yup";


interface IArtist {
  nome: string;
}

const bodyValidation: yup.Schema<IArtist> = yup.object().shape({
  nome: yup.string().required().min(1)
});

export const create = async (req: Request<{}, {}, IArtist>, res: Response) => {
  let validatedData: IArtist | undefined = undefined;

  try{
    validatedData = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.message
      }
    });
  }

  return res.send(validatedData.nome);
};