const LS_USER_ID_KEY = "pg-user-id";
const LS_USER_NAME_KEY = "pg-user-name";

export interface User {
    id: string;
    name: string;
}

export const updateUser = (user: User) => {
    localStorage.setItem(LS_USER_ID_KEY, user.id);
    localStorage.setItem(LS_USER_NAME_KEY, user.name);
};

export const getUser = () => {
    const id = localStorage.getItem(LS_USER_ID_KEY) ?? "";
    const name = localStorage.getItem(LS_USER_NAME_KEY) ?? "";
    return { id, name };
};
