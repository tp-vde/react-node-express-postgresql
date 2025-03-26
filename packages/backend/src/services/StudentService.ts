import { formatDate, StudentRow } from '../types/types';
import knex from 'knex';
import config from '../utils/knexConnect';

const TABLE = 'students';
const dbClient = knex({
  ...config.development,
  client: 'pg',
  connection: {
    ...(config.development.connection as object), 
    database: 'vde_database', 
    password: 'password'
  },
});

export class StudentService {
  async createStudent(student: StudentRow): Promise<void> {
    await dbClient(TABLE).insert({
      code: student.code,
      name: student.name,
      first_name: student.first_name,
      email: student.email,
      phone: student.phone,
      speciality: student.speciality,
      entry_at: student.entry_at,
      first_departure_mission_at: student.first_departure_mission_at
    }).onConflict(['code', 'email']).merge();
  }

  async getAllStudents(): Promise<StudentRow[]> {
    const students: StudentRow[] = await dbClient<StudentRow>(TABLE).select("*");
    return students.map((row) => ({
      code: row.code,
      name: row.name,
      first_name: row.first_name,
      email: row.email,
      phone: row.phone,
      speciality: row.speciality,
      entry_at: formatDate(new Date(row.entry_at)),
      first_departure_mission_at: row.first_departure_mission_at ? formatDate(new Date(row.first_departure_mission_at)): undefined,
    }));
  };

  async deleteStudent(stCode?: string ) {
    return await dbClient(TABLE).where({ code: stCode }).delete();
  };

  async getStudentById(stCode: string): Promise<StudentRow> {
    return await dbClient(TABLE).where({ code: stCode }).first();
  };

}
