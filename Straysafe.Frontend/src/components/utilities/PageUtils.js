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

  