
  export interface UserRow {
    id?: number;
    code: string;
    name: string;
    first_name: string;
    email: string;
    phone: string;
    speciality: string;
    entry_at: string | null;
    // entry_at: Date | string;
    first_departure_mission_at?: string | null;
    created_at?: Date | string;
  };
  

