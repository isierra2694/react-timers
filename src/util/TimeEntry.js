import { useState, useEffect } from 'react';

const TimeEntry = ({ newTime, onTimeChange, inputClassName }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const newHours = Math.floor(newTime / 3600);
        const newMinutes = Math.floor((newTime - newHours * 3600) / 60);
        const newSeconds = Math.floor(newTime - newHours * 3600 - newMinutes * 60);

        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
    }, [newTime]);

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
                <button onClick={() => {
                    const newHours = Math.min(hours + 1, 99);
                    setHours(newHours);
                    const updatedTime = newHours * 3600 + minutes * 60 + seconds;
                    onTimeChange(updatedTime);
                }}>&#8743;</button>
                <input name="hours" className={inputClassName} onChange={onInputChange} value={hours.toString().padStart(2, '0')}/>
                <button onClick={() => {
                    const newHours = Math.max(hours - 1, 0);
                    setHours(newHours);
                    const updatedTime = newHours * 3600 + minutes * 60 + seconds;
                    onTimeChange(updatedTime);
                }}>&#8744;</button>
            </div>
            <div>
                <button onClick={() => {
                    const newMinutes = Math.min(minutes + 1, 59);
                    setMinutes(newMinutes);
                    const updatedTime = hours * 3600 + newMinutes * 60 + seconds;
                    onTimeChange(updatedTime);
                }}>&#8743;</button>
                <input name="minutes" className={inputClassName} onChange={onInputChange} value={minutes.toString().padStart(2, '0')}/>
                <button onClick={() => {
                    const newMinutes = Math.max(minutes - 1, 0);
                    setMinutes(newMinutes);
                    const updatedTime = hours * 3600 + newMinutes * 60 + seconds;
                    onTimeChange(updatedTime);
                }}>&#8744;</button>
            </div>
            <div>
                <button onClick={() => {
                    const newSeconds = Math.min(seconds + 1, 59);
                    setSeconds(newSeconds);
                    const updatedTime = hours * 3600 + minutes * 60 + newSeconds;
                    onTimeChange(updatedTime);
                }}>&#8743;</button>
                <input name="seconds" className={inputClassName} onChange={onInputChange} value={seconds.toString().padStart(2, '0')}/>
                <button onClick={() => {
                    const newSeconds = Math.max(seconds - 1, 0);
                    setSeconds(newSeconds);
                    const updatedTime = hours * 3600 + minutes * 60 + newSeconds;
                    onTimeChange(updatedTime);
                }}>&#8744;</button>
            </div>
            
        </div>
    );
}

export default TimeEntry;