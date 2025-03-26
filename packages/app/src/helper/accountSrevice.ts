
const saveToken = (token: string) => {
    localStorage.setItem('token', token)
};

const logout = () => {
    localStorage.removeItem('token');
};

const isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
};

const getToken = () => {
    let token = localStorage.getItem('token');
    return token;
};

export const isExpired = () =>{
    const JWT = getToken() as string ;
    if (!JWT) {
      throw new Error('User token is missing expiration');
    }
    const jwtPayload = JSON.parse(window.atob(JWT.split('.')[1]));
    const isExpired = Date.now() >= jwtPayload.exp * 1000;
    return isExpired;
};

export const accountSrevice = {
    saveToken, logout, isLogged, getToken, isExpired
};