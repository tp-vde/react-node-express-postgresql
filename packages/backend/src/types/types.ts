export interface UserRow {
  id:string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  created_at: Date | string;
};

// export interface RoleRow {
//   id: number;
//   name: string;
//   created_at?: Date | string;
// };

export interface UserRoleRow {
  email: string;
  role: string;
  password: string;
};

export interface StudentRow {
  code: string;
  name: string;
  first_name: string;
  email: string;
  phone: string;
  speciality: string;
  entry_at: Date | string;
  first_departure_mission_at?: Date | string;
  created_at?: Date | string;
};

export function formatDate(nwdate: Date) {
  const   date = new Date(nwdate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
}


export interface IUserData {
  exp: any;
  email: string;
  role: string;
  password: string;
}

export interface IRequestUser extends Request {
  user: IUserData;
}

export type IAuthRequest = IRequestUser & {
  headers: { authorization: string };
};

