import { Knex } from "../../knex";
import { IArtist } from "../../models"; 
import { ETableNames } from "../../ETableNames";


export const getById = async(artistId: IArtist["id"]): Promise<IArtist | Error> => {
  try {
    const result = await Knex(ETableNames.artist).select().where({ id: artistId }).first();
    if(typeof result === "object"){
      return result;
    }

    return new Error("Erro ao consultar artista");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar artista");
  }
};