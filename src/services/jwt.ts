export const getToken = () => {
    return window.localStorage.getItem("jwtToken");
}

export const saveToken = (token: string) => {
    window.localStorage.setItem("jwtToken", token);
}

export const destroyToken = () => {
    window.localStorage.removeItem("jwtToken");
}