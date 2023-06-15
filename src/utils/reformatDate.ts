export const reformatInputToFlixbusDateString = (oldDate: string) => {
    const parts = oldDate.split('-');
    const newDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
    return newDate;
};

export const reformatFlixbusDateStringToJSDate = (oldDateString: string, time: string) => {
    if (oldDateString) {
        const rideDateParts = oldDateString.split('.');
        const newDate = new Date(`${rideDateParts[1]}.${rideDateParts[0]}.${rideDateParts[2]} ${time}`).getTime();
        return newDate;
    }

    return null;
};
