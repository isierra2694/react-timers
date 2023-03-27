import { useState, useRef, useEffect } from 'react'
import Timer from '../util/Timer';

const Home = () => {
    const [timers, setTimers] = useState([]);
    const id = useRef(0);

    useEffect(() => {
        //if (Notification.permission !== 'granted') Notification.requestPermission();
    }, [])

    const addNewTimer = () => {
        const newTimer = {
            id: id.current,
            totalTime: 0,
            duration: 0
        }
        setTimers([...timers, newTimer]);
        id.current = id.current + 1;
    }

    const changeTime = (id, newTime) => {
        setTimers(timers => {
            const editedTimer = {
                id: id,
                totalTime: newTime,
                duration: newTime
            }
            const toUpdateIndex = timers.findIndex(item => item.id === id);
            return [...timers.slice(0, toUpdateIndex), editedTimer, ...timers.slice(toUpdateIndex + 1)]
        })
    }

    const removeTimer = (id) => {
        setTimers(timers => {
            const toDeleteIndex = timers.findIndex(item => item.id === id);
            return [...timers.slice(0, toDeleteIndex), ...timers.slice(toDeleteIndex + 1)];
        });
    }

    return (
        <>
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="timers-container">
                {
                    timers.map(timer => <Timer key={timer.id} id={timer.id} propsTotalTime={timer.totalTime} propsDuration={timer.duration} propsChangeTime={changeTime} propsRemoveTimer={removeTimer}/>)
                }
            </div>
            <button className="add-timer-button" onClick={addNewTimer}>Add a new timer</button>
        </>
    );
}

export default Home;