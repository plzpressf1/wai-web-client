const LS_USER_ID_KEY = "pg-user-id";
const LS_USER_NAME_KEY = "pg-user-name";

const LS_MEMO_TEXT_KEY = "pg-memo-text";
const LS_MEMO_POS_SIZE_KEY = "pg-memo-pos-size";

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

export interface PosSize {
    x: number;
    y: number;
    w: number;
    h: number;
}

export const updateMemo = (text: string, posSize: PosSize) => {
    localStorage.setItem(LS_MEMO_TEXT_KEY, text);
    localStorage.setItem(LS_MEMO_POS_SIZE_KEY, [posSize.x, posSize.y, posSize.w, posSize.h].join(","));
};

export const getMemo = () => {
    const toInt = (x: string | undefined) => {
        if (x === undefined) return 0;
        let v = parseInt(x);
        if (!v) v = 0;
        return v;
    };

    const text = localStorage.getItem(LS_MEMO_TEXT_KEY) ?? "";
    const posSizeString = localStorage.getItem(LS_MEMO_POS_SIZE_KEY) ?? "";
    let [x, y, w, h] = posSizeString.split(",");

    const posSize: PosSize = {
        x: toInt(x),
        y: toInt(y),
        w: toInt(w),
        h: toInt(h),
    };

    // check if zero
    if (posSize.x === 0 && posSize.y === 0 && posSize.w === 0 && posSize.h === 0) {
        posSize.x = 400;
        posSize.y = 300;
        posSize.w = 700;
        posSize.h = 500;
    }

    return { text, posSize };
};
