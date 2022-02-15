import "./App.css";
import Schedule from "./Schedule.js";
import React, { useEffect, useState } from "react";
import ChangeDate from "./ChangeDate.js";

const ScheduleAndDatePicker = () => {
  const [startDate, setStartDate] = useState(
    new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000 * 12
  );

  function changeDate(props) {
    //console.log(new Date(props).toLocaleDateString('en-US'))
    setStartDate(props);
  }
  return (
    <>
      <ChangeDate startDate={startDate} changeDate={changeDate} />
      <br/>
      <Schedule startDate={startDate} />
    </>
  );
};
function App() {
  //console.log(startDate)

  return (
    <div className="App">
      <div className="appTitle">
        <h1 className="">Envelope Calendaring</h1>
      </div>
      <ScheduleAndDatePicker />
    </div>
  );
}

export default App;
