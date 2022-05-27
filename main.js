const modalWindow = document.querySelector(".modal");
const buttonModal = document.querySelectorAll(".modal_button");
const body = document.querySelector("body")

let interval;

for (btn of buttonModal){
    btn.addEventListener("click", () => {
        modalWindow.style.display = "flex";
        body.classList.add("noskroll");
    });
}

modalWindow.addEventListener("click", () => {
    const isModal = event.target.closest(".modal_inner");
    const isCross = event.target.closest(".cross_close");

    if (!isModal || isCross) {
        modalWindow.style.display = "none";
        body.classList.remove("noskroll");
    }
});


//timer - real time
let days = document.querySelector("#timer_days");
let hours = document.querySelector("#timer_hours");
let minutes = document.querySelector("#timer_minutes");
let seconds = document.querySelector("#timer_seconds");

function setTimer(){
    let currDate = new Date();
    let deadline = new Date("31 may 2022 23:08").getTime();
    let timeRemain = (deadline - currDate) / 1000;

    let currDay = Math.floor(timeRemain / 3600 / 24);
    let currHours = Math.floor((timeRemain / 3600) % 24);
    let currMinutes = Math.floor((timeRemain / 60) % 60);
    let currSec = Math.floor(timeRemain % 60);

    currDay = addZero(currDay);
    currHours = addZero(currHours);
    currMinutes = addZero(currMinutes);
    currSec = addZero(currSec);

    days.innerHTML = currDay;
    hours.innerHTML = currHours;
    minutes.innerHTML = currMinutes;
    seconds.innerHTML = currSec;

    days.nextElementSibling.innerHTML = numWord(currDay, ["День", "Дня", "Дней"]);
    hours.nextElementSibling.innerHTML = numWord(currHours, ["Час", "Часа", "Часов"]);
    minutes.nextElementSibling.innerHTML = numWord(currMinutes, ["Минута", "Минуты", "Минут"]);
    seconds.nextElementSibling.innerHTML = numWord(currSec, ["Секунда", "Секунды", "Секунд"]);
    
    // interval clear
    if(timeRemain <= 0){
        clearInterval(interval);
        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
    }
}

function addZero(elem){
    if (elem < 10){
        return "0" + elem
    }
    else{
        return elem
    }
}

function numWord(value, array){
    value = Math.abs(value) % 100;
    
    
    if (value == 1 || (value % 10 == 1 && value > 11)){
        return array[0]
    }
    else if (value > 10 && value < 20){
        return array[2]
    }
    else if (value % 10 > 1 && value % 10 < 5){
        return array[1]
    }
    else{
        return array[2]
    }
}


interval = setInterval(setTimer, 500);
setTimer();


// server
modalWindow.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let obj = {
        name: modalWindow.querySelector("#name_form_inp").value,
        tel: modalWindow.querySelector("#tel_form_inp").value,
        email: modalWindow.querySelector("#email_form_inp").value
    }

    // POST
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        if (response.status == 201) alert("Успешно");
        if (response.status == 404) alert("Not found");
    })
    .finally(() => {
        modalWindow.querySelector("#name_form_inp").value = "";
        modalWindow.querySelector("#tel_form_inp").value = "";
        modalWindow.querySelector("#email_form_inp").value = "";
    })
});

