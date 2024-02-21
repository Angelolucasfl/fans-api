import { Knex } from "../../knex";
import { IFollower } from "../../models"; 
import { ETableNames } from "../../ETableNames";


export const UpdateById = async(id: number, follower: Omit<IFollower, "id">): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.artist)
      .where("id", "=", follower.ArtistId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("Artista não encontrado ao tentar atualizar");
    }

    const result = await Knex(ETableNames.follower).update(follower).where("id", "=", id);
    if (result > 0) return;

    return new Error("Erro ao atualizar registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar registro");
  }
};