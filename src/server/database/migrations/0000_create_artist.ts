import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.artist, table => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 255).index().notNullable();

      table.comment("Tabela de armazenamento de artistas do sistema");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.artist}`);
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.artist)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.artist}`);
    });
}