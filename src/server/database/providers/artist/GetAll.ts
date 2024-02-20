import { Knex } from "../../knex";
import { IArtist } from "../../models"; 
import { ETableNames } from "../../ETableNames";


export const getAll = async(page: number, limit: number, filter: string, id = 0): Promise<IArtist[] | Error> => {
  try {
    const results = await Knex(ETableNames.artist).select("*")
      .where("id", Number(id)).orWhere("nome", "like", `%${filter}%`)
      .offset((page-1) * limit).limit(limit);

    if (id > 0 && results.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames)
        .select("*").where("id", "=", id).first();

      if(resultById) return [...results, resultById];
    }

    return results;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar artistas");
  }
};