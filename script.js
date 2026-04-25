const openTimer = document.querySelectorAll('[data-modal-target]')
const openOtherTimer = document.querySelectorAll('[data-modal-target-time]')
const overlay = document.getElementById('overlay')
const overlayTime = document.getElementById('overlayTime')

var timerRan = 'false';

var countdown = new Date().getTime() + 3600000; // Note for Samara - annotate  

openTimer.forEach(div => { 
    window.addEventListener('load', () => {
    const savedStatus = localStorage.getItem('timerStatus');
    const savedTime = localStorage.getItem('time');

    if (savedStatus === 'true' && savedTime) {
        // Hide the input modal if it's currently showing
        const modal = document.getElementById('modalTime');
        const overlay = document.getElementById('overlayTime');
        if (modal) modal.classList.remove('active');
        if (overlay) overlay.classList.remove('active');

        startCountdownInterval(parseInt(savedTime));
    }
});
})

openOtherTimer.forEach(button => {
    button.addEventListener('click', () => {
        const t = button.closest('.modalTime')
        if (localStorage.getItem('timerStatus')) {
            t.classList.remove('active')
            overlayTime.classList.remove('active')
        }
        confirmed(t)
    })
})

function runInterval() {
    if (!localStorage.getItem("time")) {
        localStorage.setItem("time", countdown);
    }

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
    
    localStorage.setItem("time", new Date().getTime() + 3600000)
}

function openModal(modal) {
    if (modal == null) return false
    modal.classList.add('active')
    overlay.classList.add('active')
    runInterval() // ok you make everything work. why are you negative
}

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
    localStorage.setItem('timerStatus', timerRan)
    
}

function confirmed(t) {
    if (t == null) return
    
    t.classList.remove('active')
    overlayTime.classList.remove('active')
    timerRan = 'true'

    const totalMs = (hour * 3600000) + (min * 60000) + (sec * 1000);
    const endTime = new Date().getTime() + totalMs;

    localStorage.setItem('timerStatus', timerRan);
    localStorage.setItem('timerEndTime', endTime);

    timerCountdown(endTime);
}

//Timer Countdown
function timerCountdown(endTime) {
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            window.location.replace('index.html');
            return;
        }

        const h = Math.floor(distance / 3600000);
        const m = Math.floor((distance % 3600000) / 60000);
        const s = Math.floor((distance % 60000) / 1000);

        const display = document.getElementById("runningTimer");
        if (display) display.innerHTML = `${h}h ${m}m ${s}s`;

    }, 1000);
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
