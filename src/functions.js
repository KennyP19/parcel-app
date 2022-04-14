export function getParsedDate(recievedDate, option = 'parcel') {

    if (option === 'parcel') { 
        let date = recievedDate.toDate();

        return String(date.getDate() + '/' + (date.getMonth()) + '/' + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes())
    }
    else if (option === 'stats') {
        let date = new Date(recievedDate);

        const month = date.toLocaleString('default', { month: 'short' });
        const dateString = String(date.getDate() + ' ' + (month) + ' ' + date.getFullYear())

        return dateString
    } 
    else if (option === 'stats_timestamp') {
        let date = recievedDate.toDate();

        const month = date.toLocaleString('default', { month: 'short' });
        const dateString = String(date.getDate() + ' ' + (month) + ' ' + date.getFullYear())

        return dateString
    }

}

export function getWeeklyData(date_days) {
    let daily_data = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0
    }

    date_days.forEach(element => {
        daily_data[element] += 1
    });

    return daily_data
}

// export function getStartDate(recievedDate) {
//     var startDate = new Date()

//     recievedDate.forEach(element => {
//         let date = new Date(element);

//         if (date < startDate) {
//             startDate = date
//         }
//     });

//     return startDate
// }

// export function getAllWeeks() {
//     var startingDay = new Date(new Date().getFullYear(), 0, 1);

//     if (startingDay.getDay() !== 1) {
//         startingDay = startingDay
//     }

//     console.log(startingDay.getDay())

// }

export function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
  
    const dates = [];
  
    while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
  
    return dates;
}

export function getParcelDataInRange(datesInRange, parcelDates) {
    const numOfParcels = {}

    datesInRange.forEach(element => {
        numOfParcels[element] = 0
    });

    parcelDates.forEach(element => {
        if (datesInRange.includes(element)) {
            numOfParcels[element] += 1
        }
    });

    const result = Object.keys(numOfParcels).map((k) => numOfParcels[k])

    return result
}