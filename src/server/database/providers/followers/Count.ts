import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";


export const Count = async(filter = ""): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.follower).where("nomeUsuario", "like", `%${filter}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count); 

    return new Error("Erro ao consultar a quantidade total de registros");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar a quantidade total de registros");
  }
};