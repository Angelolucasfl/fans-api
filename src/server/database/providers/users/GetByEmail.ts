import { Knex } from "../../knex";
import { IUser } from "../../models"; 
import { ETableNames } from "../../ETableNames";


export const GetByEmail = async(email: string): Promise<IUser | Error> => {
  try {
    const result = await Knex(ETableNames.user).select("*").where("email", "=", email).first();
    if(typeof result === "object"){
      return result;
    }

    return new Error("Registro não encontrado");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar registro");
  }
};