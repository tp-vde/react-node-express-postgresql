import { formatDate, UserRow } from '../types/types';
import knex from 'knex';
import config from '../utils/knexConnect';

const TABLE = 'vde_students';
const dbClient = knex({
  ...config.development,
  client: 'pg',
  connection: {
    ...(config.development.connection as object), 
    database: 'vde_database', 
    password: 'password'
  },
});

export class UserService {
  async createUser(user: UserRow): Promise<void> {
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

  async getAllUsers(): Promise<UserRow[]> {
    const users: UserRow[] = await dbClient<UserRow>(TABLE).select("*");
    return users.map((row) => ({
      id: row.id,
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

  async deleteUser(userId?: string ) {
    return await dbClient(TABLE).where({ code: userId }).delete();
  };

  async getUserById(userId: string): Promise<UserRow> {
    return await dbClient(TABLE).where({ code: userId }).first();
  };

}
