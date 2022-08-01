# Twitch Countdown Timer

A countdown timer for Twitch that can be used by mods to run quick countdowns on stream.

## How to use

### Setting up stream

In your streaming software, create a new browser source with the following parameters: 

- URL: https://snazzyfox.github.io/twitch-countdown-timer/
- Width: 640, Height: 240 per timer. (480 for 2 timers, 720 for 3 timers)
- Shutdown source when not active: optional. If selected, the timer will not receive any commands when it's hidden in your stream, and save you a tiny amount of system resources. If unselected the timer can be controlled even when it's not on screen.

The first time you load the page, you will need to enter interact mode for your browser source, and enter your channel name and click "save". This will be remembered for future uses. 

If you entered the wrong channel name, double click on the page to clear saved data.

### Usage

| Command                     | Example                | Description                                                                                                     |
| --------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| `!timer [duration] [title]` | `!timer 5m Prediction` | Start a new timer. If a title is given, it'll be displayed under the timer. If there's already a timer running, this timer will be created below existing ones.
| `!timer off [title]` | `!timer off [title]` | Remove the timer with the given title. If multiple timers has the same title, the first match is removed. |
| `!timer off [index]` | `!timer off [index]` | Remove the timer with the given index. Index starts at 1 and goes from top of screen to bottom. |

The timer stays on screen and flashes when it reaches zero. You must use the off command to remove it from screen.

The duration can either be a single number in seconds (e.g. 300 = 5 minutes), or a string in the format "1d12h34m56s" with no spaces in between to denote the number of days, hours, minutes, and seconds to count.

This tool does not have a bot - the entire thing runs in your browser. It will not receive commands when the page is closed / your stream source is shutdown. However, it will remember the last active timer, and will continue counting even if the page is shut down/stream is off.