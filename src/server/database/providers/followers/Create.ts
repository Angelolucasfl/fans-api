import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFollower } from "../../models"; 

export const Create = async(follower: Omit<IFollower, "id">): Promise<number | Error> => {
  try{
    const [{ count }] = await Knex(ETableNames.artist)
      .where("id", "=", follower.artistId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("Artista não encontrado ao tentar cadastrar");
    }

    const [result] = await Knex(ETableNames.follower).insert(follower).returning("id");
    if(typeof result === "object"){
      return result.id;
    } else if(typeof result === "number"){
      return result;
    }

    return new Error("Erro ao cadastrar novo registro");
  } catch (error){

    console.log(error);
    return new Error("Erro ao cadastrar novo registro");
  }

};