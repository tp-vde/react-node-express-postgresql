import { formatDate, UserRoleRow, UserRow } from '../types/types';
import knex from 'knex';
import config from '../utils/knexConnect';
import { v4 as uuid } from 'uuid';
import generator from 'generate-password';
import bcrypt from 'bcrypt';

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

    const generatePassword = generator.generate({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      strict: true,
    });
    const hashPassword = await bcrypt.hash(generatePassword, 12);
    await dbClient(USER_ROLE)
      .insert({
        email: user.email,
        role: user.role,
        password:  generator.generate({ length: 10, numbers: true }),
      })
      .onConflict(["email"])
      .merge(['role']);
      // on envoie le mot de passe généré par email : à changer après première connexion
      const pass =  await dbClient(USER_ROLE).where({ email: user.email}).select("password").first(); // remplacer par generatePassword 
      return pass.password;
  }

  async getAllUsers(): Promise<UserRow[]> {
    const users = await dbClient<UserRow & { role: string}>('users as a')
      .select('a.*', 'b.role')
      .join('user_roles as b', 'a.email', 'b.email')
      .orderBy('a.last_name', 'asc');
    return users.map((user) => ({
      id: user.id,
      last_name: user.last_name,
      first_name: user.first_name,
      email: user.email,
      phone: user.phone,
      role:  user.role,
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
