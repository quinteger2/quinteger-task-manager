import "./App.css";
import Schedule from "./Schedule.js";
import React, { useEffect, useState } from "react";
import ChangeDate from './ChangeDate.js'

const ScheduleAndDatePicker = () => {
  const [startDate, setStartDate] = useState(
    new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 * 28
  );

  function changeDate(props) {
    //console.log(new Date(props).toLocaleDateString('en-US'))
    setStartDate(props);
  }
  return (
    <>
      <ChangeDate startDate={startDate} changeDate={changeDate} />
      <Schedule startDate={startDate} />
    </>
  );
};
function App() {
  //console.log(startDate)

  return (
    <div className="App">
      <h1
        className="appTitle"
        style={{
          margin: "0 auto",
          width: "20rem",
          borderRadius: ".5rem",
          boxShadow: "0rem .8rem .8rem .2rem #364E8E",
          padding: ".5rem",
          border: ".1rem solid black",
        }}
      >
        Quinteger Calendar
      </h1>
      <ScheduleAndDatePicker />
    </div>
  );
}

export default App;
