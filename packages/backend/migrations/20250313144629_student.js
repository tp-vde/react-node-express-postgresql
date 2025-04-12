/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
    return knex.schema.createTable('students' , table => {
      table.comment('Table des etudiants');
      table
          .string('code')
          .primary()
          .notNullable()
          .comment('Le code de l\'étudiant');
      table
          .string('name')
          .notNullable()
          .comment('Nom de l\'étudiant');
      table
          .string('first_name')
          .notNullable()
          .comment('Prénom de l\'étudiant');
      table
          .string('email')
          .unique()
          .notNullable()
          .comment('Email de l\'étudiant');
      table
          .string('phone')
          .notNullable()
          .comment('Numéro de telephone de l\'étudiant');
      table
          .string('speciality')
          .notNullable()
          .comment('spécialite de l\'étudiant');
      table
          .date('entry_at')
          .notNullable()
          .comment('date d\entre de l\'étudiant');
      table
          .date('first_departure_mission_at')
          .nullable()
          .comment('date de premier départ en mission');    
      table
          .timestamp('created_at', { useTz: false, precision: 0 })
          .notNullable()
          .defaultTo(knex.fn.now())
          .comment('Date récente à laquelle les données de l\'étudiant ont été actualisées');
      table.index(['code'], 'students_code_idx');
      table.unique(['code', 'email'], {
          indexName: 'students_unique_idx',
        });
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema
    .dropTable('students')
  }
  

