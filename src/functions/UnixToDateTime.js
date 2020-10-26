const getMonthName =(id) =>
{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[id];
}

const getDateTime = (unix_timeStamp) =>{
    return new Date(parseInt(unix_timeStamp)).toString();
}

const getDate = (unix_timeStamp) =>{
    let result = ""
    const time = new Date(unix_timeStamp * 1000)
    result += getMonthName(time.getMonth()) + " "
    result += time.getDate() + " ,"
    result += time.getFullYear()

    return result;
}

const getTime = (unix_timeStamp) =>{
    let result = ""
    const time = new Date(unix_timeStamp * 1000)
    result += time.getHours() + ":"
    result += time.getMinutes()

    return result;
}

export {
    getDateTime
}