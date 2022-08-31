export const convertTimeToSeconds = (hms)  => {
    const [hours, minutes] = hms.split(':');
    return (+hours) * 60 * 60 + (+minutes) * 60;
};

export const getCurrentTimeInSeconds = () => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })

    return convertTimeToSeconds(currentTime)
}

export const convertHourAndMinutesIntoSec = s => {
    const hours= ((s - s % 3600) / 3600) % 60;
    const minutes= ((s - s % 60) / 60) % 60; 
    const seconds= s % 60;

    return hours + ':' + minutes
}