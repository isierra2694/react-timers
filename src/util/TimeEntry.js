import { useState, useEffect, useRef } from 'react';

const TimeEntry = ({ inputClassName, disabled, onTimeChange }) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const onTimeChangeRef = useRef(onTimeChange);

    useEffect(() => {
        onTimeChangeRef.current(seconds + minutes * 60 + hours * 60 * 60);
    }, [seconds, minutes, hours])

    const onSecondsChange = (e) => {
        const seconds = parseInt(e.target.value);
        if (seconds < 59 && seconds >= 0) {
            setSeconds(seconds);
        }
        if (e.target.value === '') setSeconds(0);
    }

    const onMinutesChange = (e) => {
        const minutes = parseInt(e.target.value);
        if (minutes < 59 && minutes >= 0) {
            setMinutes(minutes);
        }
        if (e.target.value === '') setMinutes(0);
    }

    const onHoursChange = (e) => {
        const hours = parseInt(e.target.value);
        if (hours <= 99 && hours >= 0) {
            setHours(hours);
        }
        if (e.target.value === '') setHours(0);
    }

    return (
        <div className="time-entry-container">
            <input className={inputClassName} onChange={onSecondsChange} maxLength={2} disabled={!!disabled}></input>
            <input className={inputClassName} onChange={onMinutesChange} maxLength={2} disabled={!!disabled}></input>
            <input className={inputClassName} onChange={onHoursChange} maxLength={2} disabled={!!disabled}></input>
        </div>
    );
}

export default TimeEntry;