function getKeys(data) {
    let keys = [];
    for (let key in data) {
        keys.push(key);
    }
    return keys;
}

export { getKeys }