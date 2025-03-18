import fetch from 'cross-fetch';
import { StudentRow, UserRow } from './types';
import { accountSrevice } from '../helper/accountSrevice';



export class ApiClient {
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async getStudentData(): Promise<StudentRow[]> {
    const token = accountSrevice.getToken();
    const response = await fetch(`${this.backendUrl}/api/students`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data: StudentRow[] = await response.json();
    return data;
  };



  async getStudentById(userId: string): Promise<StudentRow[]> {
    const queryString = new URLSearchParams({userId});
    const token = accountSrevice.getToken();
    const fetchUrl = `${this.backendUrl}/api/student?${queryString}`;
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data: StudentRow[] = await response.json();
    return data;
  };


  async pushStudent(user: StudentRow): Promise<boolean> {
    const token = accountSrevice.getToken();
    const fetchUrl = `${this.backendUrl}/api/student`;
    const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw Error('Error');
    }
    return true;
  };

  async deleteStudent(userId: string): Promise<boolean> {
    const queryString = new URLSearchParams(userId.toString());
    const token = accountSrevice.getToken();
    const fetchUrl = `${this.backendUrl}/api/student?${queryString}`;
    const response = await fetch(fetchUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw Error('Error');
    }
    return true;
  };


  
  async getUserData(): Promise<UserRow[]> {
    const token = accountSrevice.getToken();
    const response = await fetch(`${this.backendUrl}/api/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data: UserRow[] = await response.json();
    return data;
  };

  async pushUser(user: UserRow): Promise<boolean> {
    const token = accountSrevice.getToken();
    const fetchUrl = `${this.backendUrl}/api/user`;
    const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw Error('Error');
    }
    return true;
  };

};
