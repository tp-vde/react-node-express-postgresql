import { IFormInput } from "../pages/LoginForm";


const backendUrl = 'http://localhost:7007';

export const getAccessToken = async (credential: IFormInput): Promise<string> =>{ 
    const fetchUrl = `${backendUrl}/api/login?${credential}`;
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
    const tokenKey = await response.json();
    return tokenKey.token;
  };
  
  
  
  export const getCredentials = async (): Promise<IFormInput> => {
    const fetchUrl = `${backendUrl}/api/profile`;
    const token = getAccessToken({email: "user2@example.com", password: "password123"})
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
  const credential = await response.json();
  return credential.token;

  };