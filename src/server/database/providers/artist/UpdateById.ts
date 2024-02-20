import { Knex } from "../../knex";
import { IArtist } from "../../models"; 
import { ETableNames } from "../../ETableNames";


export const UpdateById = async(id: number, artist: Omit<IArtist, "id">): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.artist).update(artist).where("id", "=", id);
    if (result > 0) return;

    return new Error("Erro ao atualizar registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar registro");
  }
};