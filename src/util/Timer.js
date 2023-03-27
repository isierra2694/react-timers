import { useState, useEffect, useRef, useReducer } from 'react';

import CircleProgressBar from './CircleProgressBar';
import TimeEntry from './TimeEntry';

// 'Timer' part of the timer.
const Timer = ({ id, propsTotalTime, propsDuration, propsChangeTime, propsRemoveTimer }) => {
    const [totalTime, setTotalTime] = useState(propsTotalTime);
    const duration = useRef(propsDuration);
    const [name, setName] = useState('');

    const [running, setRunning] = useState(false);
    const previousTimeRef = useRef();
    const [, forceUpdate] = useReducer(x => x + 1, 0); // we do a little trolling

    useEffect(() => {
        let interval;
        if (running && duration.current > 0) {
            previousTimeRef.current = Date.now();
            interval = setInterval(() => {
                // calculate delta time and subtract it from duration
                const deltaTime = (Date.now() - previousTimeRef.current) / 100;
                previousTimeRef.current = Date.now();
                duration.current = duration.current - deltaTime;
                // check if timer is complete
                if (duration.current < 0) {
                    duration.current = 0;
                    setRunning(false);
                    // eslint-disable-next-line
                    const done = new Notification(name !== '' ? name + ' is done!' : 'Timer is done!');
                }
                forceUpdate();
            }, 100);
        }
        return () => clearInterval(interval);
    }, [running, duration, name]);

    // get percentage of timer left
    const getPercentageLeft = () => {
        if (totalTime === 0) return 0;
        return (duration.current / totalTime * 100);
    }

    // when TimeEntry changes value handle that
    const onTimeChange = (seconds) => {
        setRunning(false);
        setTotalTime(seconds * 10);
        duration.current = seconds * 10;
    }

    // set running if duration is positive
    const playPause = () => {
        if (duration.current > 0) {
            setRunning(!running);
        }
    }

    // reset time to starting time
    const resetTime = () => {
        setRunning(false);
        duration.current = totalTime;
        forceUpdate(); // goofy trick since we need to rerender after updating duration
    }

    // on remove timer button pressed alert parent component
    const removeTimer = () => {
        console.log(id);
        propsRemoveTimer(id);
    }

    // when the name is changed set the name
    const onNameChange = (e) => {
        setName(e.target.value);
    }

    return (
        <div className="timer-card">
            <div className="timer-card-title-container">
                <input className="timer-title" name="title" value={name} onChange={onNameChange} placeholder="Timer title..."></input>
            </div>
            <div className="timer-card-progress-container">
                <CircleProgressBar size={200} progress={getPercentageLeft()} label={<TimeEntry newTime={duration.current / 10} onTimeChange={onTimeChange} inputClassName="time-entry-input"/>}/>
            </div>
            <div className="timer-card-controls-container">
                <button className="timer-card-button" onClick={resetTime}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10C2 10 4.00498 7.26822 5.63384 5.63824C7.26269 4.00827 9.5136 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.89691 21 4.43511 18.2543 3.35177 14.5M2 10V4M2 10H8" stroke="#29292e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className="timer-card-button" onClick={playPause}>
                    {
                        running && (
                            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.163 3.819C5 4.139 5 4.559 5 5.4v13.2c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .656-.656c.163-.32.163-.74.163-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C8.861 3 8.441 3 7.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zm9 0C14 4.139 14 4.559 14 5.4v13.2c0 .84 0 1.26.164 1.581a1.5 1.5 0 0 0 .655.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .655-.656c.164-.32.164-.74.164-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C17.861 3 17.441 3 16.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.655.656z" fill="#29292e"/></svg>
                        )
                    }
                    {
                        !running && (
                            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z" fill="#29292e"/></svg>
                        )
                    }
                </button>
                <button className="timer-card-button" onClick={removeTimer}>
                    <svg fill="#29292e" height="23px" width="23px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
                        <g>
                            <g>
                                <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
                                    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
                                    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
                                    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
                                    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
                                    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
                                    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Timer;