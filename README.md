# Twitch Countdown Timer

A countdown timer for Twitch that can be used by mods to run quick countdowns on stream.

## How to use

### Setting up stream

In your streaming software, create a new browser source with the following parameters: 

- URL: [link here]
- Width: 640, Height 240
- Shutdown source when not active: if selected, the timer will not receive any commands when it's hidden in your stream.

The first time you load the page, you will need to enter interact mode for your browser source, and enter your channel name and click "save". This will be remembered for future uses. 

If you entered the wrong channel name, double click on the page to clear saved data.

### Usage

| Command                     | Example                | Description                                                                                                     |
| --------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| `!timer [duration]`         | `!timer 5m`            | Start a new timer with the given duration with no title.                                                        |
| `!timer [duration] [title]` | `!timer 5m Prediction` | Start a new timer with the given title, which will show above the timer.                                        |
| `!timer`                    | `!timer`               | Clears the current timer so it disappears. When the timer reaches zero, it'll stay on the screen until cleared. |

This tool does not have a bot - the entire thing runs in your browser. It will not receive commands when the page is closed / your stream source is shutdown. However, it will remember the last active timer, and will continue counting even if the page is shut down.