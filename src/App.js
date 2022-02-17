import "./App.css";
import React from "react";
import ScheduleWithChangeDate from "./components/ScheduleWithChangeDate";
import Mobile from "./components/Mobile";
import { AppContext } from "./AppContext";

function App() {
  //console.log(startDate)
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

  const initialContext = {hello: "world"}

  return (
    <div className="App">
      <AppContext.Provider value={initialContext}>
        <div>
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
        {width < breakpoint ? <Mobile /> : <ScheduleWithChangeDate />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
