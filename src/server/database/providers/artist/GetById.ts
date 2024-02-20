import { Knex } from "../../knex";
import { IArtist } from "../../models"; 
import { ETableNames } from "../../ETableNames";


export const GetById = async(id: number): Promise<IArtist | Error> => {
  try {
    const result = await Knex(ETableNames.artist).select("*").where("id", "=", id).first();
    if(typeof result === "object"){
      return result;
    }

    return new Error("Erro ao consultar registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar registro");
  }
};