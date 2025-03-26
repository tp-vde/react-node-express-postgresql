/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function up(knex) {
    return knex.schema.createTable('user_roles' , table => {
      table.comment('Table des roles');
      table
          .string('email')
          .unique()
          .notNullable()
          .comment('Email de l\'utilisateur');
      table
          .string('role')
          .notNullable()
          .defaultTo('USER')
          .comment('Role de telephone de l\'utilisateur');
      table
          .string('password')
          .notNullable()
          .comment('Mot de passe de l\'utilisateur');   
      table.index(['email'], 'user_roles_code_idx');
      table.unique(['role', 'email'], {
          indexName: 'user_roles_unique_idx',
        });
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function down(knex) {
    return knex.schema
    .dropTable('user_roles')
  };
  

