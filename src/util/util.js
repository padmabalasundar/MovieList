export function checkEmptyObject(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
}


export function checkEmptyArray(array){
    if (typeof array !== 'undefined' && array.length > 0)
        return false;
    return true
}