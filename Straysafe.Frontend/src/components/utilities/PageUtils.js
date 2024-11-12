export function RedirectTo(path) {
    location.href = path;
}

export function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

export function onlyUniqueChat(value, index, array) {
    return array.indexOf(value).id === index.id;
}

export function getMonth(index){
    let d = new Date();
    d.setMonth(index)
    return d.toDateString().split(" ")[1];
}

export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const minOfLength = (str, min = 1) => {
    const n = new String(str).length;
    if(n >= min) return true;
    return false;
}

  