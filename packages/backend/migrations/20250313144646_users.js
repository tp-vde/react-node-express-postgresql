/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('users' , table => {
      table.comment('Table des utilisateurs');
      table
           .uuid('id')
           .primary()
           .notNullable()
           .comment('Identifiant unique');
      table
          .string('first_name')
          .notNullable()
          .comment('Le prénom de l\'utilisateur');
      table
          .string('last_name')
          .notNullable()
          .comment('Nom de l\'utilisateur');
      table
          .string('email')
          .unique()
          .notNullable()
          .comment('Email de l\'utilisateur');
      table
          .string('phone')
          .notNullable()
          .comment('Numéro de telephone de l\'utilisateur');   
      table
          .timestamp('created_at', { useTz: false, precision: 0 })
          .notNullable()
          .defaultTo(knex.fn.now())
          .comment('Date récente à laquelle les données de l\'utilisateur ont été actualisées');
      table.index(['id'], 'users_id_idx');
      table.unique(['phone', 'email'], {
          indexName: 'users_unique_idx',
        });
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema
    .dropTable('users')
  };
  

