import React from "react"

export default function Task(props) {
    if (props.task.date !== undefined)
      return (
        <>
          <p>{props.task.content}</p>
          <p>{props.task.date.toLocaleDateString("en-US")}</p>
        </>
      );
    else return <p>{props.task.content}</p>;
  }