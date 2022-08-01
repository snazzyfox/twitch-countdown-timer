var endTime, title;
var timerData = [];
var timerElements = [];

function padNumber(num) {
    return num.toString().padStart(2, "0");
}

function saveState() {
    localStorage.setItem('timerData', JSON.stringify(timerData));
}

function loadState() {
    const storedData = localStorage.getItem('timerData');
    if (storedData) {
        timerData = JSON.parse(storedData);
        timerData.forEach(createTimerElement);
        updateTimer();
    }
    console.log('Loaded stored data.', timerData)
}

/**
 * Create a timer HTML Element, inserts it on the page, and record its reference.
 */
function createTimerElement() {
    const timerId = timerData.length;

    const containerElement = document.createElement('div');
    containerElement.classList.add('timer-container');

    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    containerElement.appendChild(timerElement);

    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    containerElement.appendChild(titleElement);

    document.getElementById('timers').appendChild(containerElement);
    timerElements.push({container: containerElement, timer: timerElement, title: titleElement});
}

/**
 * Add a new timer
 * @param {number} milliseconds Number of milliseconds to count down
 * @param {string} title 
 */
function addTimer(milliseconds, title) {
    createTimerElement();
    timerData.push({
        endTime: Date.now() + milliseconds + 500, // extra half second for buffer
        title: title,
    });
    updateTimer(); // force update timer to avoid delays
    saveState();
    console.log("Added new timer", milliseconds, ", title=", title);
}

/**
 * Remove a timer.
 * @param {number | string} name title of the timer during creation, OR a 1-based index of the timer.
 *   If more than one timer has the same title, the first match will be removed.
 */
function removeTimer(title) {
    // See if a timer with the given title can be found
    let index = timerData.findIndex(timer => timer.title === title);
    if (index === -1) {
        index = parseInt(title[0]) - 1;
    }
    if (index >=0 && index < timerElements.length) {
        const [removed] = timerData.splice(index, 1);
        console.log('Removing timer', index, removed);
        const [{container: containerElement}] = timerElements.splice(index, 1);
        containerElement.classList.add('leave');
        setTimeout(() => { containerElement.remove(); }, 1000);
        saveState();
    }
}

/**
 * Formats time as days:hours:minutes:seconds
 * @param {number} milliseconds milliseconds left in the timer
 * @returns {string} formatted time
 */
function formatTime(milliseconds) {
    if (milliseconds > 500) {
        const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
        const hours = Math.floor(milliseconds / (60 * 60 * 1000)) % 24;
        const minutes = Math.floor(milliseconds / (60 * 1000)) % 60;
        const seconds = Math.floor(milliseconds / 1000) % 60;
        var formatted = ""
        if (days > 0) {
            formatted += days.toString() + ":";
        }
        if (hours > 0) {
            formatted += padNumber(hours.toString()) + ":";
        }
        formatted += padNumber(minutes) + ":" + padNumber(seconds);
    } else {
        formatted = "00:00";
    }
    return formatted
}

/** Update all timers on screen to show their corresponding time. */
function updateTimer() {
    const now = Date.now();
    timerData.forEach(({endTime, title}, index) => {
        const remainingMs = endTime - now;
        const formatted = formatTime(remainingMs);
        const {timer: timerElement, title: titleElement} = timerElements[index];
        timerElement.innerText = formatted;
        titleElement.innerText = title;
        if (formatted === '00:00') {
            timerElement.classList.add('done');
        } else {
            timerElement.classList.remove('done');
        }
    });
}

ComfyJS.onCommand = (user, command, message, flags, extra) => {
    if (!(flags.mod || flags.broadcaster)) { return }
    switch (command) {
        case 'timer':
            const [firstToken, ...restTokens] = message.split(/\s+/);
            const title = restTokens.length ? restTokens.join(" ") : "";
            if (firstToken === 'off') {
                removeTimer(title);
            } else {
                const durationMs = Duration.parse(firstToken).milliseconds();
                addTimer(durationMs, title);
            }
    }
}

window.addEventListener('load', () => {
    const channelName = localStorage.getItem("channel"); // Hide channel name input if channel name already set
    loadState();
    if (channelName) {
        ComfyJS.Init(channelName);
        document.getElementById("channel-form").style.display = 'none';
    }
    setInterval(updateTimer, 500);
})

document.getElementById("channel-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const newValue = document.getElementById("channel-input").value;
    if (newValue) {
        localStorage.setItem("channel", newValue);
        window.location.reload(); // Instead of managing state just reload the page for simplicity
    }
})

window.addEventListener('dblclick', () => {
    localStorage.clear();
    window.location.reload();
})
