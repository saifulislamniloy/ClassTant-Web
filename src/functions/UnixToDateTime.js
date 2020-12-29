const getDateTime = (unix_timeStamp) =>{
    return new Date(parseInt(unix_timeStamp)).toString();
}

export {
    getDateTime
}