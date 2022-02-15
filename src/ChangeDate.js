import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function ChangeDate(props) {
  const [_date, setDate] = useState(new Date(props.startDate));

  return (
    <div className="ChangeDate" style={{width: "12em"}}>
      <DatePicker
        selected={_date}
        onChange={(date) => {
          setDate(date.setHours(0, 0, 0, 0));
        }}
      />
      <button onClick={() => props.changeDate(_date)} style={{width: "10em"}}>Change Date</button>
    </div>
  );
}
