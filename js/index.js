console.log('Hello world');

let weatherCondition = document.getElementById('weatherCondition');
let date = document.getElementById('date');
let tempStatus = "Clouds";

function getCurrentDay() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentDays = new Date();
    let currentDay = currentDays.getDay();
    let day = days[currentDay];
    // console.log(day.substring(0, 3))
    // let newArr = (day.split(''));
    return day.substring(0, 3);

}

function getCurrentTime() {
    let yearArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let currentTime = new Date();
    let month = yearArr[currentTime.getMonth()];
    let date = currentTime.getDate();

    let hours = currentTime.getHours();
    let mins = currentTime.getMinutes();
    let twelveHourDelay = "AM";
    if (hours > 11) {
        twelveHourDelay = "PM";
        if (hours > 12) {
            hours = hours - 12;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }
    }
    return `${month} ${date} | ${hours}:${mins}${twelveHourDelay}`;
}
date.textContent = getCurrentDay() + " | " + getCurrentTime();