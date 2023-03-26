import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';

function Router() {
    return (
        <Routes>
            <Route path='/react-timers/' element={<Home />} />
            <Route path='/react-timers/about' element={<About />} />
        </Routes>
    )
}

export default Router;