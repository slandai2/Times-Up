// Target data for block timer and play timer respectively
const openTimer = document.querySelectorAll('[data-modal-target]')
const openOtherTimer = document.querySelectorAll('[data-modal-target-time]')
const testVar = document.querySelectorAll('[data-modal-target-time]')
// Target data to apply overlay to block timer and play timer
const overlay = document.getElementById('overlay')
const overlayTime = document.getElementById('overlayTime')

var timerRan = 'false';
var playing = 'false';

var countdown = new Date().getTime() + 3600000;   

// Checks to open block timer
openTimer.forEach(div => { 
    // When site is opened, open block timer on load if the play timer ran
    window.addEventListener('load', () => {
        const saved = localStorage.getItem('timerStatus')
        if (saved === 'true') {
            const modal = div.closest('.modal')
            countdown = parseInt(localStorage.getItem("time"))
            openModal(modal)
        } 
    })
})

// hecks to open play timer
openOtherTimer.forEach(button => {
    // When user clicks confirm, close the pop up
    button.addEventListener('click', () => {
        const t = button.closest('.modalTime')
        confirmed(t)
    })
})

// When opening game page, check to open pop up to set play timer
testVar.forEach(div => {
    window.addEventListener('load', () => {
        // If the time has been confirmed, begin play timer
        const confirmTime = localStorage.getItem('confirmedTime')
        const x = div.closest('.modalTime')
        if (confirmTime === 'true') {
            endTime = parseInt(localStorage.getItem('updatedEndTime'))
            timerCountdown(endTime)
            x.classList.remove('active')
            overlayTime.classList.remove('active')
        }
    })
})

// Runs block timer
function runInterval() {
    // If "time" value isn't set, set to 1 hour
    if (!localStorage.getItem("time")) {
        localStorage.setItem("time", countdown);
    }

    // Interval to run block countdown
    x = setInterval(function () {
        let now = new Date().getTime()
        let distance = countdown - now;
        
        
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerHTML = hours + "h " + minutes + "m " + seconds + "s"

        if (distance <= 0) {
            closeModal(modal)
        }

        localStorage.setItem("time", now + distance)

            
    }, 1000)

    // Reset time
    localStorage.setItem("time", new Date().getTime() + 3600000)
}

// Open block timer and run the countdown
function openModal(modal) {
    if (modal == null) return false
    modal.classList.add('active')
    overlay.classList.add('active')
    runInterval() 
}

// Close block timer
function closeModal(modal) {
    if (modal == null) return
    clearInterval(x)
    document.getElementById("countdown").innerHTML = "Welcome Back";
    localStorage.removeItem('time');
    setTimeout(() => {
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }, 1000)
    timerRan = 'false'
    localStorage.setItem('confirmedTime', playing);
    localStorage.setItem('timerStatus', timerRan)
    
}

// Confirm user set play time and begin timer
function confirmed(t) {
    if (t == null) return
    
    t.classList.remove('active')
    overlayTime.classList.remove('active')
    timerRan = 'true'

    const totalMs = (hour * 3600000) + (min * 60000) + (sec * 1000);
    var endTime = new Date().getTime() + totalMs;

    localStorage.setItem('confirmedTime', 'true');

    timerCountdown(endTime);
}

//Timer Countdown
function timerCountdown(endTime) {
    if(!localStorage.getItem('updatedEndTime')) {
        localStorage.setItem('updatedEndTime', endTime)
    }
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            clearInterval(x);
            localStorage.setItem('timerStatus', 'true');
            window.location.replace('index.html');
            return;
        }

        const h = Math.floor(distance / 3600000);
        const m = Math.floor((distance % 3600000) / 60000);
        const s = Math.floor((distance % 60000) / 1000);

        const display = document.getElementById("runningTimer");
        if (display) display.innerHTML = `${h}h ${m}m ${s}s`;

        localStorage.setItem('updatedEndTime', now + distance)

    }, 1000);
    localStorage.setItem('confirmTime', 'false')
    localStorage.setItem("time", new Date().getTime() + 3600000)
}

//Timer Page
// Timer Buttons
let increaseHour = document.querySelector(".increaseHour");
let decreaseHour = document.querySelector(".decreaseHour");

let increaseMinute = document.querySelector(".increaseMinute");
let decreaseMinute = document.querySelector(".decreaseMinute");

let increaseSecond = document.querySelector(".increaseSecond");
let decreaseSecond = document.querySelector(".decreaseSecond");

// P element Numbers (for timer)
let hNumber = document.querySelector(".hNumber");
let mNumber = document.querySelector(".mNumber");
let sNumber = document.querySelector(".sNumber");

// button funct
let hour = 0;
let min = 0;
let sec = 0;

// Hours
increaseHour.onclick = function() {
    if (hour < 24) {
        hour++; 
        hNumber.innerText = hour;
    }
};
decreaseHour.onclick = function() {
    if (hour > 0) {
        hour--;
        hNumber.innerText = hour;
    }
};

// Minutes
increaseMinute.onclick = function() {
    if (min < 59) {
        min++; 
        mNumber.innerText = min;
    }
};
decreaseMinute.onclick = function() {
    if (min > 0) {
        min--;
        mNumber.innerText = min;
    }
};

// Seconds
increaseSecond.onclick = function() {
    if (sec < 59) {
        sec++; 
        sNumber.innerText = sec;
    }
};
decreaseSecond.onclick = function() {
    if (sec > 0) {
        sec--;
        sNumber.innerText = sec;
    }
};
