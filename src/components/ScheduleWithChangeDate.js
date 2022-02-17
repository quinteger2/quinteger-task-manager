import React, { useState } from "react";
import Schedule from "./Schedule.js";
import ChangeDate from "./ChangeDate.js";

export default function ScheduleWithChangeDate() {
  const numberOfDaysToOffsetStart = -1;

  const [startDate, setStartDate] = useState(
    new Date().setHours(0, 0, 0, 0) +
      numberOfDaysToOffsetStart * 24 * 60 * 60 * 1000 * 12
  );

  function changeDate(props) {
    //console.log(new Date(props).toLocaleDateString('en-US'))
    setStartDate(props);
  }

  return (
    <>
      <ChangeDate startDate={startDate} changeDate={changeDate} />
      <br />
      <Schedule startDate={startDate} />
    </>
  );
}
