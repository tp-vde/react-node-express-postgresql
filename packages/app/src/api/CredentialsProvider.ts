import { IFormInput } from "./types";


const backendUrl = 'http://localhost:7007';

export const getAccessToken = async (credential: IFormInput): Promise<string> =>{ 
    const fetchUrl = `${backendUrl}/api/login`;
    const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
    });
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const key = await response.json();
    return key.token;
};
  
export const getCredentials = async (): Promise<IFormInput> => {
    const fetchUrl = `${backendUrl}/api/profile`;
    const token = localStorage.getItem('token');

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const credential = await response.json();
  return credential.user;
};

export const disconnected = async (): Promise<IFormInput> => {
  const fetchUrl = `${backendUrl}/api/logout`;
  const token = localStorage.getItem('token');
  const response = await fetch(fetchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();;


};