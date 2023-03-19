# react-timers
react-timers is a simple timer application I made with React.js.  You can create your own custom-named timers and customize their length.

Sounds simple, right?  Creating an accurate countdown timer was quite the rabbit hole, as React and JavaScript are very funny when it comes to precision during small intervals of time.

## My Initial Approach
I thought that by having a `time` variable that would get subtracted X amount of milliseconds using `setInterval` over X amount of time would be a great approach.  Boy was I wrong!  My inital tests showed that for the span of one minute, the timer would be off by ~4-5 seconds.  Clearly this was not ideal at all!  Additionally, `setInterval` stops when the browser window is out of view, so the timer would also pause permanently whenever I navigated away from the page, unless I wanted to use a Web Worker to constantly update the timer in the background.

## Racking My Brains
`setInterval` and `setTimeout` are not guaranteed to finish in X amount of milliseconds, so subtracting X amount of milliseconds from my `time` variable was not a good solution.
