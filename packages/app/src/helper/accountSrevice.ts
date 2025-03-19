
const saveToken = (token: string) => {
    localStorage.setItem('token', token)
}

const logout = () => {
    localStorage.removeItem('token');
}

const isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

const getToken = () => {
    let token = localStorage.getItem('token');
    return token;
}

export const accountSrevice = {
    saveToken, logout, isLogged, getToken
}