import { Knex } from "../../knex";
import { IArtist } from "../../models"; 
import { ETableNames } from "../../ETableNames";


export const getAll = async(): Promise<IArtist[] | Error> => {
  try {
    const results = await Knex(ETableNames.artist).select();
    return results; 
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar artistas");
  }
};