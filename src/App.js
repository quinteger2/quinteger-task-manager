import "./App.css";
import Schedule from "./Schedule.js";
import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerExample = (props) => {
  const [_date, setDate] = useState(new Date(props.startDate));
  //console.log(typeof _date)
  return (
    <div className="DatePickerExample">
      <DatePicker
        selected={_date}
        onChange={(date) => {
          setDate(date.setHours(0, 0, 0, 0));
        }}
      />
      <button onClick={() => props.changeWord(_date)}>Change Word</button>
    </div>
  );
};
function App() {
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0) +  24 * 60 * 60 * 1000 * 28);

  function changeWord(props) {
    //console.log(new Date(props).toLocaleDateString('en-US'))
    setStartDate(props)
  }

  //console.log(startDate)

  return (
    <div className="App">
      <DatePickerExample startDate={startDate} changeWord={changeWord}/>
      {startDate.toLocaleString('en-US')}
      <Schedule startDate={startDate}/>
    </div>
  );
}

export default App;
