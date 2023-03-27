import { useState, useEffect } from 'react';

const TimeEntry = ({ newTime, onTimeChange, inputClassName }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // parse newTime when it is updated
    useEffect(() => {
        const newHours = Math.floor(newTime / 3600);
        const newMinutes = Math.floor((newTime - newHours * 3600) / 60);
        const newSeconds = Math.floor(newTime - newHours * 3600 - newMinutes * 60);

        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
    }, [newTime]);

    // when the inputs change handle updating hours, minuts, seconds and call onTimeChange from parent component
    const onInputChange = (e) => {
        const name = e.target.name;
        if (e.target.value.length > 1 && e.target.value.charAt(0) === '0') e.target.value = e.target.value.slice(1);
        let value = parseInt(e.target.value);
        if (isNaN(value)) value = 0;
        let updatedTime;

        if (name === 'hours') {
            setHours(value);
            updatedTime = value * 3600 + minutes * 60 + seconds;
        }
        else if (name === 'minutes') {
            setMinutes(value); 
            updatedTime = hours * 3600 + value * 60 + seconds;
        }
        else if (name === 'seconds') {
            setSeconds(value);
            updatedTime = hours * 3600 + minutes * 60 + value;
        }

        onTimeChange(updatedTime);
    }

    return (
        <div className="time-entry-container">
            <div>
                <button className="time-entry-incrementer" onClick={() => {
                    const newHours = Math.min(hours + 1, 99);
                    setHours(newHours);
                    const updatedTime = newHours * 3600 + minutes * 60 + seconds;
                    onTimeChange(updatedTime);
                }}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow / Caret_Up_MD">
                            <path id="Vector" d="M8 14L12 10L16 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
                <input name="hours" className={inputClassName} onChange={onInputChange} value={hours.toString().padStart(2, '0')}/>
                <button className="time-entry-incrementer" onClick={() => {
                    const newHours = Math.max(hours - 1, 0);
                    setHours(newHours);
                    const updatedTime = newHours * 3600 + minutes * 60 + seconds;
                    onTimeChange(updatedTime);
                }}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow / Caret_Down_MD">
                            <path id="Vector" d="M16 10L12 14L8 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
            </div>
            <div>
                <button className="time-entry-incrementer" onClick={() => {
                    const newMinutes = Math.min(minutes + 1, 59);
                    setMinutes(newMinutes);
                    const updatedTime = hours * 3600 + newMinutes * 60 + seconds;
                    onTimeChange(updatedTime);
                }}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow / Caret_Up_MD">
                            <path id="Vector" d="M8 14L12 10L16 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
                <input name="minutes" className={inputClassName} onChange={onInputChange} value={minutes.toString().padStart(2, '0')}/>
                <button className="time-entry-incrementer" onClick={() => {
                    const newMinutes = Math.max(minutes - 1, 0);
                    setMinutes(newMinutes);
                    const updatedTime = hours * 3600 + newMinutes * 60 + seconds;
                    onTimeChange(updatedTime);
                }}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow / Caret_Down_MD">
                            <path id="Vector" d="M16 10L12 14L8 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
            </div>
            <div>
                <button className="time-entry-incrementer" onClick={() => {
                    const newSeconds = Math.min(seconds + 1, 59);
                    setSeconds(newSeconds);
                    const updatedTime = hours * 3600 + minutes * 60 + newSeconds;
                    onTimeChange(updatedTime);
                }}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow / Caret_Up_MD">
                            <path id="Vector" d="M8 14L12 10L16 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
                <input name="seconds" className={inputClassName} onChange={onInputChange} value={seconds.toString().padStart(2, '0')}/>
                <button className="time-entry-incrementer" onClick={() => {
                    const newSeconds = Math.max(seconds - 1, 0);
                    setSeconds(newSeconds);
                    const updatedTime = hours * 3600 + minutes * 60 + newSeconds;
                    onTimeChange(updatedTime);
                }}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow / Caret_Down_MD">
                            <path id="Vector" d="M16 10L12 14L8 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
            </div>
            
        </div>
    );
}

export default TimeEntry;