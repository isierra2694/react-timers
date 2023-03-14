import { useState, useEffect } from 'react';

import CircleProgressBar from './CircleProgressBar';
import TimeEntry from './TimeEntry';

const Timer = () => {
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

    const getPercentageLeft = () => {
        if (totalTime === 0) return 0;
        return (duration / totalTime * 100);
    }

    const onTimeChange = (seconds) => {
        setRunning(false);
        setTotalTime(seconds * 10);
        setDuration(seconds * 10);
    }

    const resetTime = () => {
        setRunning(false);
        setDuration(totalTime);
    }

    return (
        <div className="timer-card">
            <div className="timer-card-title-container">
                <input className="timer-title" name="title" placeholder="Timer title..."></input>
            </div>
            <div className="timer-card-progress-container">
                <CircleProgressBar size={200} progress={getPercentageLeft()} label={<TimeEntry onTimeChange={onTimeChange} inputClassName="time-entry-input"/>}/>
            </div>
            <div className="timer-card-controls-container">
                <button className="timer-card-button" onClick={resetTime}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10C2 10 4.00498 7.26822 5.63384 5.63824C7.26269 4.00827 9.5136 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.89691 21 4.43511 18.2543 3.35177 14.5M2 10V4M2 10H8" stroke="#29292e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className="timer-card-button" onClick={() => setRunning(!running)}>
                    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z" fill="#29292e"/></svg>
                </button>
                <button className="timer-card-button">
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