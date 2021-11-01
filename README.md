# Twitch Countdown Timer

A countdown timer for Twitch that can be used by mods to run quick countdowns on stream.

## How to use

### Setting up stream

In your streaming software, create a new browser source with the following parameters: 

- URL: https://snazzyfox.github.io/twitch-countdown-timer/
- Width: 640, Height: 240
- Shutdown source when not active: optional; if selected, the timer will not receive any commands when it's hidden in your stream but will save you a little bit of system resources. If unselected the timer can be controlled even when it's not on screen.

The first time you load the page, you will need to enter interact mode for your browser source, and enter your channel name and click "save". This will be remembered for future uses. 

If you entered the wrong channel name, double click on the page to clear saved data.

### Usage

| Command                     | Example                | Description                                                                                                     |
| --------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| `!timer [duration]`         | `!timer 5m`            | Start a new timer with the given duration with no title.                                                        |
| `!timer [duration] [title]` | `!timer 5m Prediction` | Start a new timer with the given title, which will show above the timer.                                        |
| `!timer`                    | `!timer`               | Clears the current timer so it disappears. When the timer reaches zero, it'll stay on the screen until cleared. |

The duration can either be a single number in seconds (e.g. 300 = 5 minutes), or a string in the format "1d12h34m56s" with no spaces in between to denote the number of days, hours, minutes, and seconds to count.

This tool does not have a bot - the entire thing runs in your browser. It will not receive commands when the page is closed / your stream source is shutdown. However, it will remember the last active timer, and will continue counting even if the page is shut down.