export function RedirectTo(path) {
    location.href = path;
}

export function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

export function onlyUniqueChat(value, index, array) {
    return array.indexOf(value).id === index.id;
}

  