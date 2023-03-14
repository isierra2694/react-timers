import { useState } from 'react'
import Timer from '../util/Timer';

const Home = () => {
    const [timers, setTimers] = useState([]);

    const addNewTimer = () => {
        setTimers([
            ...timers,
            <Timer key={'timer'}/>
        ]);
    }

    return (
        <>
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="timers-container">
                { timers }
            </div>
            <button className="add-timer-button" onClick={addNewTimer}>Add a new timer</button>
        </>
    );
}

export default Home;