import { ETableNames } from "../../ETableNames";
import { IFollower } from "../../models";
import { Knex } from "../../knex";


export const GetById = async (id: number): Promise<IFollower | Error> => {
  try {
    const result = await Knex(ETableNames.follower)
      .select("*").where("id", "=", id).first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Registro não encontrado");
  }
};