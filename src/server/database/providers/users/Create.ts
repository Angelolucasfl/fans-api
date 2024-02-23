import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";
import { PasswordCrypto } from "../../../shared/services"; 

export const Create = async(user: Omit<IUser, "id">): Promise<number | Error> => {
  try{
    const hashedPassword = await PasswordCrypto.hashPassword(user.senha);

    const [result] = await Knex(ETableNames.user).insert({...user, senha: hashedPassword}).returning("id");
    if(typeof result === "object"){
      return result.id;
    } else if(typeof result === "number"){
      return result;
    }

    return new Error("Erro ao cadastrar novo usuário");
  } catch (error){

    console.log(error);
    return new Error("Erro ao cadastrar novo usuário");
  }

};