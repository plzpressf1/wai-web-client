const LS_USER_ID_KEY = "pg-user-id";
const LS_USER_NAME_KEY = "pg-user-name";

const LS_MEMO_TEXT_KEY = "pg-memo-text";
const LS_MEMO_COLS_KEY = "pg-memo-cols";
const LS_MEMO_ROWS_KEY = "pg-memo-rows";

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

export const updateMemo = (text: string, cols: number, rows: number) => {
    localStorage.setItem(LS_MEMO_TEXT_KEY, text);
    localStorage.setItem(LS_MEMO_COLS_KEY, cols.toString());
    localStorage.setItem(LS_MEMO_ROWS_KEY, rows.toString());
};

export const getMemo = () => {
    const text = localStorage.getItem(LS_MEMO_TEXT_KEY) ?? "";
    const colsString = localStorage.getItem(LS_MEMO_COLS_KEY) ?? "60";
    const rowsString = localStorage.getItem(LS_MEMO_ROWS_KEY) ?? "20";
    const cols = parseInt(colsString);
    const rows = parseInt(rowsString);
    return { text, cols, rows };
};
