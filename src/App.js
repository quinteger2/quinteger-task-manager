import "./App.css";
import Schedule from "./Schedule.js";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerExample = (props) => {
  const [_date, setDate] = useState(new Date(props.startDate));

  return (
    <div className="DatePickerExample">
      <DatePicker
        selected={_date}
        onChange={(date) => {
          setDate(date.setHours(0, 0, 0, 0));
        }}
      />
      <button onClick={() => props.changeDate(_date)}>Change Date</button>
    </div>
  );
};

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
      <DatePickerExample startDate={startDate} changeDate={changeDate} />
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
