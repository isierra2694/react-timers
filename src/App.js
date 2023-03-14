import Navbar from "./Navbar";
import Router from "./util/Router";

function App() {
    return (
        <>
            <Navbar />
            <div id="wrapper">
                <div className="page-container">
                    <Router />
                </div>
            </div>
            
        </>
    );
}

export default App;