d = new Date()
p = new Date() + 1000 * 60 * 60 * 24
console.log(p)

const getNumberOfDays = (startDate, endDate) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

console.log(getNumberOfDays(d, p))