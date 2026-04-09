const openTimer = document.querySelectorAll('[data-modal-target]')
const overlay = document.getElementById('overlay')

var countdown = new Date().getTime() + 15000; // x amount of time 
var currentTime = new Date().getTime()
var measuredDistance = countdown - currentTime;
let timerRan = true
let testBool = false
var reloadCount = 0
var x


openTimer.forEach(div => { // focus on opening modal instead of keeping it closed
    if (timerRan) {
        window.addEventListener('load', () => {
            const modal = div.closest('.modal')
            openModal(modal)
            countdown = localStorage.getItem("time")
                    // ok. i think this works fine actually. figure out whats going on w bool  
    })
    }
})

// var x = setInterval(function () {
//         currentTime = new Date().getTime()
//         var distance = localStorage.getItem("time") - currentTime
            
//         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//         document.getElementById("countdown").innerHTML = hours + "h " + minutes + "m " + seconds + "s"
        
//         if (distance < 0) {
//             closeModal(modal)
//         }
            
//         localStorage.setItem("time", countdown)
// }, 1000)
// } // need smth to prevent interval from running every time
function runInterval() {
    x = setInterval(function () {
        currentTime = new Date().getTime()
        var distance = measuredDistance
        if (measuredDistance <= localStorage.getItem("time")) {
            distance = localStorage.getItem("time") - currentTime 
        }
        // will show correct time then reset to first time
        
        
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerHTML = hours + "h " + minutes + "m " + seconds + "s"

        if (distance < 0) {
            closeModal(modal)
        }

        localnStorage.setItem("time", countdown)

            
    }, 1000)
    
    localStorage.setItem("time", new Date().getTime() + 15000) // not ecactly hjhghjghg
}

function openModal(modal) {
    if (modal == null) return false
    modal.classList.add('active')
    overlay.classList.add('active')
    runInterval() // ok you make everything work. why are you negative
}

function closeModal(modal) {
    if (modal == null) return
    //console.log(distance)
    clearInterval(x)
    document.getElementById("countdown").innerHTML = "Welcome Back";
    localStorage.clear();
    setTimeout(() => {
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }, 1000)
    
}

// in the morning: make this open on start up then set timer to take it off (complete)
// create countdown timer to display on modal (complete)
// mess with local storage so that timer doesn't reset on reload (complete)
// check what's going on with local storage
// add explanations (annotate)
// ask kevin for code so i can implement properly


