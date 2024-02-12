import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "yup";
import { Schema } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: Schema<T>) => Schema<T>

type TAllSchemas = Record<TProperty, Schema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler

export const validation: TValidation = (getAllSchemas) => async(req, res, next) => {
  const schemas = getAllSchemas(schema => schema);
  const errorResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try{
      schema.validateSync(req[key as TProperty], { abortEarly: false });

    } catch (error) {
      const yupError = error as ValidationError;
      const errors: Record<string, string> = {};
  
      yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
      });
      errorResult[key] = errors;
    }
  });

  if (Object.entries(errorResult).length === 0){
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorResult });
  }
};