
  export interface StudentRow {
    code: string;
    name: string;
    first_name: string;
    email: string;
    phone: string;
    speciality: string;
    entry_at: string | null;
    first_departure_mission_at?: string | null;
    created_at?: string;
  };
  
export type IFormInput = {
  email: string;
  password: string;
};


export type UserRow = {
  id?: string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  role: string;
}