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
  async createStudent(user: StudentRow): Promise<void> {
    await dbClient(TABLE).insert({
      code: user.code,
      name: user.name,
      first_name: user.first_name,
      email: user.email,
      phone: user.phone,
      speciality: user.speciality,
      entry_at: user.entry_at,
      first_departure_mission_at: user.first_departure_mission_at
    }).onConflict(['code', 'email']).merge();
  }

  async getAllStudents(): Promise<StudentRow[]> {
    const users: StudentRow[] = await dbClient<StudentRow>(TABLE).select("*");
    return users.map((row) => ({
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
