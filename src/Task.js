import React from "react";

export default function Task(props) {
  
  if (props.task.date !== undefined)
    return (
      <>
        <div
        className="progressBar"
          style={{
            width: `${props.task.percentComplete}%`,
            backgroundColor: "red",
            margin: 0
          }}
        >
          {" "}
          <p style={{fontWeight:"bold"}}>{props.task.content}</p>
          <p style={{fontWeight:"bold"}}>{props.task.date.toLocaleDateString("en-US")}</p>
        </div>
      </>
    );
  else return <p>{props.task.content}</p>;
}
