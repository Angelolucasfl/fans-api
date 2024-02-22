import { Knex } from "../../knex";
import { IFollower } from "../../models"; 
import { ETableNames } from "../../ETableNames";


export const GetAll = async(page: number, limit: number, filter: string): Promise<IFollower[] | Error> => {
  try {
    const results = await Knex(ETableNames.follower).select("*")
      .where("nomeUsuario", "like", `%${filter}%`)
      .offset((page-1) * limit).limit(limit);

    return results;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar registros");
  }
};