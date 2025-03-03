import fetch from 'cross-fetch';
import { VdeData } from './types';

export class VdeApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUserData(): Promise<VdeData[]> {
    const response = await fetch(`${this.baseUrl}/api/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data: VdeData[] = await response.json();
    return data;
  };

  async pushUser(user: VdeData): Promise<boolean> {

    const url = `${this.baseUrl}/api/users`;
    const response = await fetch(url, {
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
};