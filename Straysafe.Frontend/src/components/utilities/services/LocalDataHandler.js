export const SaveLocalData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const GetLocalData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const DeleteLocalData = (key) => {
    localStorage.removeItem(key);
}