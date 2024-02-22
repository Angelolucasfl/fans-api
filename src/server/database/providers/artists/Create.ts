import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IArtist } from "../../models"; 

export const Create = async(artist: Omit<IArtist, "id">): Promise<number | Error> => {
  try{
    const [result] = await Knex(ETableNames.artist).insert(artist).returning("id");
    if(typeof result === "object"){
      return result.id;
    } else if(typeof result === "number"){
      return result;
    }

    return new Error("Erro ao cadastrar novo artista");
  } catch (error){

    console.log(error);
    return new Error("Erro ao cadastrar novo artista");
  }

};