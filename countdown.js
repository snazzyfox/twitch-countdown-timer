var endTime, title;

function getChannelName() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('channel');
}

function padNumber(num) {
    return num.toString().padStart(2, "0");
}

function updateTimer() {
    const now = Date.now();
    const el = document.getElementById("timer");
    if (endTime) {
        const duration = endTime - now;
        if (duration > 0) {
            const days = Math.floor(duration / (24 * 60 * 60 * 1000));
            const hours = Math.floor(duration / (60 * 60 * 1000) % 24);
            const minutes = Math.floor(duration / (60 * 1000) % 60);
            const seconds = Math.floor(duration / (1000) % 60);
            var formatted = ""
            if (days > 0) {
                formatted += days.toString() + ":";
            }
            if (hours > 0) {
                formatted += padNumber(days.toString()) + ":";
            }
            formatted += padNumber(minutes) + ":" + padNumber(seconds);
            el.classList.remove("done");
        } else {
            formatted = "00:00";
            el.classList.add("done");
        }
        document.getElementById("timer").innerText = formatted;
        document.getElementById("title").innerText = title || '';
    }
}

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
    if ( (flags.moderator || flags.broadcaster) && command == 'timer' ) {
        var input_duation;
        [input_duration, ...input_title] = message.split(/\s+/);
        var duration;
        if (!input_duration) {
            duration = undefined;
        } else {
            if (!isNaN(Number(input_duration))) input_duration = input_duration + "s"; // default to seconds if no units
            duration = Duration.parse(input_duration).milliseconds();
        }
        console.log("New timer", duration, "title", title);
        endTime = Date.now() + duration;
        localStorage.setItem("endTime", endTime);
        if (input_title.length) {
            title = input_title.join(" ")
            localStorage.setItem("title", title);
        } else {
            title = undefined;
            localStorage.removeItem("title");
        }
    }
}

window.addEventListener('load', () => {
    // Hide channel name input if channel name is already set
    const channelName = localStorage.getItem("channel");
    endTime = parseInt(localStorage.getItem("endTime"));
    title = localStorage.getItem("title");
    if (channelName) {
        ComfyJS.Init(channelName);
        document.getElementById("channel-form").style.display = 'none';
    }
    setInterval(updateTimer, 500);
})

document.getElementById("channel-go").addEventListener("click", () => {
    const newValue = document.getElementById("channel-input").value;
    if (newValue) {
        localStorage.setItem("channel", newValue);
        window.location.reload();
    }
})

window.addEventListener('dblclick', () => {
    localStorage.clear();
    window.location.reload();
})
