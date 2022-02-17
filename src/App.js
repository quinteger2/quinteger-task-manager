import "./App.css";
import React from "react";
import ScheduleWithChangeDate from "./components/ScheduleWithChangeDate";

function App() {
  //console.log(startDate)

  return (
    <div className="App">
      <div className="appTitle">
        <h1 className="">Envelope Calendaring</h1>
      </div>
      <ScheduleWithChangeDate />
    </div>
  );
}

export default App;
