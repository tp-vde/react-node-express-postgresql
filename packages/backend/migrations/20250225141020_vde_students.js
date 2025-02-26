/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function up(knex) {
    return knex.schema.createTable('vde_students' , table => {
      table.comment('table des consummers');
      table.increments('id')
          .notNullable()
          .comment('user id');
      table
          .string('name')
          .notNullable()
          .comment('user name');
      table
          .string('email')
          .notNullable()
          .comment('user email');
      table.unique('email'); 
      table.primary([ 'id', 'email']);
      table.index(['id', 'name']);
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function down(knex) {
    return knex.schema
    .dropTable('vde_students')
  };
  

