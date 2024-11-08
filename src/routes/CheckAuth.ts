export const getAuth = async () => {
    const token = localStorage.getItem("authToken");
    // if (!token) {
    //     return false;
    // }
    // return true;
    return token ? token : "";
};

export const LogoutAuth = () => {
    localStorage.removeItem("authToken");
};

export function setLocalStorage(token: string) {
    localStorage.setItem("authToken", token);
}