# react-timers
react-timers is a small project I made to keep track of time for certain things and have notifications pop up when something is done.  Sounds simple, right?  This actually was a deeper rabbit hole than I thought.
## My initial approach
```
const [totalTime, setTotalTime] = useState(0);
const [duration, setDuration] = useState(0);
const [running, setRunning] = useState(false);

useEffect(() => {
    let interval;
    if (duration > 0 && running) {
        interval = setInterval(() => {
            setDuration(time => time - 1);
        }, 100);
    }
    else if (duration === 0) setRunning(false);
    return () => clearInterval(interval);
}, [running, duration]);
```
Naively, I thought that by using `setInterval` or `setTimeout` and subtracting X amount of milliseconds from my timer every specific interval, I'd be fine.  Boy was I wrong!

`setInterval` is not accurate in itself, meaning that by subtracting a constant value of 100 milliseconds from my timer, I would be off by a few.  This was worsened by how `useState` works, as it is an asynchronous function and guess what, takes time to complete (not ideal).  The timer was off by about 5 seconds after 1 minute.  Not only that, the timer paused completely if the browser window was inactive because of the nature of `setInterval`.
## Racking my brains
Instead of subtracting a constant amount of milliseconds every interval, I wisened up and decided that subtracting the amount of time passed since the last update in milliseconds was way smarter.  This would account for the inaccuracy with `setInterval`, which was great.
```
const [totalTime, setTotalTime] = useState(0);
const [duration, setDuration] = useState(0);
const [running, setRunning] = useState(false);

const previousTimeRef = useRef();

useEffect(() => {
    let interval;
    if (running && duration > 0) {
        previousTimeRef.current = Date.now();
        interval = setTimeout(() => {
            setDuration(prevTime => {
                const currentTime = Date.now();
                const deltaTime = (currentTime - previousTimeRef.current) / 50;
                previousTimeRef.current = currentTime;
                return (prevTime - deltaTime) > 0 ? prevTime - deltaTime : 0;
            });
        }, 50);
    } 
    else if (duration === 0) {
        setRunning(false);
    }
    return () => clearTimeout(interval);
}, [running, duration]);
```
Not only did this work a lot better, but it even worked if the browser window was inactive, which was great.  This was not the end of my journey, however, as it was still off by about 5 seconds after 10 minutes.  Ten times better than the last version, but still, it's off.
## Finding a solution
I did some research to find out how to optimize my timer further.  I even looked into using Web Workers to increase performance, but alas, the timer was still off by the same amount.  It took me a bit of time before I remembered how `useState` is asynchronous and is not guaranteed to update immediately.  I figured that this was most likely the cause of my problem here.  So how would I solve this?
By using `useRef`, of course!
Haha, not so fast.  `useRef` does not trigger a re-render whenever its value is changed, which is a small problem.  But not for long!
`forceUpdate` to the rescue!
Despite the negative notions around using `forceUpdate` in a project, I decided to use this since it made the timer much, MUCH more accurate over longer periods of time.  Of course, I wholeheartedly do not recommend using `forceUpdate` in any other situation 😉.  In my situation though, where I do not have a lot of state updating constantly, `forceUpdate` works fairly well.
## Final notes
Building an accurate timer in React is not as easy as I thought it would be!  Overall, I would say that doing a project like this gave me a much better understanding of how React and Javascript work behind the scenes.  It might be best to stick to open-source libraries for accurate timers, but building this was way more entertaining than `npm install react-timer-hook`.
