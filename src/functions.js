export function getDate(recievedDate, option = 'date') {

	let date = new Date(recievedDate);

    if (option === 'date') {
        return String(date.getDate() + '/' + (date.getMonth()) + '/' + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes())
    }
    else if (option == 'day'){
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let day = days[date.getDay()]
        return day
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

export function getStartDate(recievedDate) {
    var startDate = new Date()

    recievedDate.forEach(element => {
        let date = new Date(element);

        if (date < startDate) {
            startDate = date
        }
    });

    return startDate
}

export function getAllWeeks() {
    var startingDay = new Date(new Date().getFullYear(), 0, 1);

    if (startingDay.getDay() != 1) {
        startingDay = startingDay
    }

    console.log(startingDay.getDay())

}

export function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());

    date.setDate(date.getDate() + 1);
  
    const dates = [];
  
    while (date < endDate) {
        const month = date.toLocaleString('default', { month: 'short' });
        const dateString = String(date.getDate() + ' ' + (month) + ' ' + date.getFullYear())
        
        dates.push(dateString);
        date.setDate(date.getDate() + 1);
    }
  
    return dates;
}