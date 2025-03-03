import { UserRow } from '../types/types';
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
    await dbClient(TABLE).insert(user).onConflict("email").merge();
  }

  async getUsers(): Promise<UserRow[]> {
    const users: UserRow[] = await dbClient<UserRow>(TABLE).select("*");
    return users.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
    }));
  };

  async deleteUser(userId?: number ): Promise<number> {
    return await dbClient(TABLE).where({ id: userId }).del();  
  };

  async getUserById(userId: string): Promise<UserRow> {
    return await dbClient(TABLE).where({ id: userId }).del();
  };

}
