import fetch from 'cross-fetch';
import { UserRow } from './types';
import { getAccessToken } from './CredentialsProvider';



export class ApiClient {
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async getUserData(): Promise<UserRow[]> {
    const token = await getAccessToken({email: "user2@example.com", password: "password2"});
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

  async getUserById(userId: string): Promise<UserRow[]> {
    const queryString = new URLSearchParams({userId});
    const token = await getAccessToken({email: "user2@example.com", password: "password2"});
    const fetchUrl = `${this.backendUrl}/api/users?${queryString}`;
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
    const data: UserRow[] = await response.json();
    return data;
  };


  async pushUser(user: UserRow): Promise<boolean> {
    const fetchUrl = `${this.backendUrl}/api/users`;
    const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw Error('Error');
    }
    return true;
  };

  async deleteUser(userId: string): Promise<boolean> {
    const queryString = new URLSearchParams(userId.toString());
    const token = await getAccessToken({email: "user2@example.com", password: "password123"});
    const fetchUrl = `${this.backendUrl}/api/users?${queryString}`;
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

};
