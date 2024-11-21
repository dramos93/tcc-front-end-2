export const getAuth = async () => {
    const token = localStorage.getItem("authToken");
    return token ? token : "";
};

export const LogoutAuth = () => {
    localStorage.removeItem("authToken");
};

export function setLocalStorage(token: string) {
    localStorage.setItem("authToken", token);
}