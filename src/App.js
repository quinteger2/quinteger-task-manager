import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScheduleWithChangeDate from "./components/ScheduleWithChangeDate";
import Mobile from "./components/Mobile";
import { AppContext } from "./AppContext";
import Groups from './components/Groups'

function App() {

  const [contextItems, setContextItems] = React.useState([]);
  const [throttle, setThrottle] = React.useState(50);
  const initialContext = {
    contextItems,
    setContextItems,
    throttle,
    setThrottle,
  };
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;

  React.useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
         the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
         effect to only run when the component mounts, and not each time it updates.
         We only want the listener to be added once */
  }, []);

  function About() {
    return (
      <div>
        <p>About</p>
      </div>
    );
  }

  function Users() {
    return (
      <div>
        <p>Users</p>
      </div>
    );
  }
  function MobileOrDesktop() {
    return <>{width < breakpoint ? <Mobile /> : <ScheduleWithChangeDate />}</>;
  }

  return (
    <div className="App">
      <Router>
        <AppContext.Provider value={initialContext}>
          <div>
            {/*<h1 className="appTitle">Envelope Calendaring</h1>*/}
            {width < breakpoint ? (
              <h2 className="mobileTitle">
                <p style={{ margin: "0 auto", width: "11em" }}>
                  Envelope Calendaring
                </p>
              </h2>
            ) : (
              <h1 className="appTitle">Envelope Calendaring</h1>
            )}
          </div>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Users />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/" element={<MobileOrDesktop />} />
          </Routes>
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;
