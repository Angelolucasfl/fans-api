import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.follower, table => {
      table.bigIncrements("id").primary().index();
      table.string("nomeUsuario").index().notNullable();
      table.string("email").unique().notNullable();
      table.bigInteger("artistId").index().notNullable()
        .references("id").inTable(ETableNames.artist)
        .onUpdate("CASCADE").onDelete("RESTRICT");

      table.comment("Tabela de armazenamento de followeras do sistema");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.follower}`);
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.follower)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.follower}`);
    });
}