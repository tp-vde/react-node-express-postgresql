import { formatDate, UserRoleRow, UserRow } from '../types/types';
import knex from 'knex';
import config from '../utils/knexConnect';
import { v4 as uuid } from 'uuid';

var generator = require('generate-password');

const USER = 'users';
const USER_ROLE = 'user_roles';
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
  async createUser(user: UserRow & {role: string;}): Promise<void> {
    await dbClient<UserRow>(USER)
      .insert({
        id: uuid(),
        last_name: user.last_name,
        first_name: user.first_name,
        email: user.email,
        phone: user.phone,
        created_at: dbClient.fn.now(),
      })
      .onConflict(["email", 'phone'])
      .merge();

    await dbClient(USER_ROLE)
      .insert({
        email: user.email,
        role: user.role,
        password:  generator.generate({ length: 10, numbers: true }),
      })
      .onConflict(["email"])
      .merge(['role']);
      return await dbClient(USER_ROLE).where({ email: user.email}).select("password").first(); 
  }

  async getAllUsers(): Promise<UserRow[]> {
    const users: UserRow[] = await dbClient<UserRow>(USER).select("*");
    return users.map((user) => ({
      id: user.id,
      last_name: user.last_name,
      first_name: user.first_name,
      email: user.email,
      phone: user.phone,
      created_at: formatDate(new Date(user.created_at)),
    }));
  };

  async deleteUser(userId?: string ) {
    return await dbClient(USER).where({ id: userId }).delete();
  };

  async getUserById(userId: string): Promise<UserRow> {
    return await dbClient(USER).where({ code: userId }).first();
  };

  async getUserRoleById(userEmail: string, userPassword: string): Promise<UserRoleRow> {
    return await dbClient(USER_ROLE).where({ email: userEmail , password: userPassword }).first();
  };

}
