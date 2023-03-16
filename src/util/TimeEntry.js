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
        let value = parseInt(e.target.value);
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
        <div className="time-entry">
            <input type="number" name="hours" min="0" max="99" step="1" className={inputClassName} onChange={onInputChange} value={hours}/>
            <span className="time-entry-separator">:</span>
            <input type="number" name="minutes" min="0" max="59" step="1" className={inputClassName} onChange={onInputChange} value={minutes}/>
            <span className="time-entry-separator">:</span>
            <input type="number" name="seconds" min="0" max="59" step="1" className={inputClassName} onChange={onInputChange} value={seconds}/>
        </div>
    );
}

export default TimeEntry;