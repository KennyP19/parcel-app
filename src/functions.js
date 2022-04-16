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
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const daily_data = {}
    days.map(day => daily_data[day] = 0)

    const formatted_dates = []

    date_days.forEach(element => {
        let parsedDate = getParsedDate(element, 'stats_timestamp')
        formatted_dates.push(parsedDate)
    });

    const result = formatted_dates.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1 
        return acc
    }, {})

    const peak = {}
    const final_result = []

    Object.keys(result).map(key => peak[new Date(key).getDay()] = (peak[new Date(key).getDay()] < result[key] ? result[key] : peak[new Date(key).getDay()] || result[key]))
    Object.keys(peak).map(key => daily_data[days[key-1]] = peak[key])
    Object.keys(daily_data).map(data => final_result.push(daily_data[data]))

    return final_result  
}

export function getDailyData(dates) {
    const hours = Array(24).fill(0)

    const _dates = dates.reduce((res, date) => {
        res.push({date: getParsedDate(date, 'stats_timestamp'), hour: date.toDate().getHours()})
        return res
    }, [])

    const filtered_date = _dates.reduce((res, data) => {
        res[JSON.stringify(data)] = (res[JSON.stringify(data)] || 0) + 1
        return res
    }, {})

    const filtered_hours = Object.keys(filtered_date).reduce((res, data) => {
        let parsed = JSON.parse(data)['hour']
        res[parsed] = res[parsed] < filtered_date[data] ? filtered_date[data] : res[parsed] || filtered_date[data]
        return res
    } , {})
    
    Object.keys(filtered_hours).forEach(hour => {
        hours[hour] = filtered_hours[hour]
    });

    return hours


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