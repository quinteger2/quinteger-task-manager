import React, { useState } from "react";
import TaskList from "./TaskList";
import "./Tasks.css";

export default function Tasks(props) {
  const [sortBy, setSortBy] = useState("content");
  const [visibility, setVisibility] = useState("all");
  const sortOptions = [
    { label: "Content", prop: "content" },
    { label: "Percent Complete", prop: "percent" },
    { label: "Date", prop: "date" },
    { label: "Person", prop: "person" },
  ];

  const sortOptionsButtons = sortOptions.map((item) => {
    return (
      <div key={item.prop}>
        <input type="radio" value={item.prop} name="sortBy" />
        <label htmlFor="html">{item.label}</label>
        <br />
      </div>
    );
  });

  function onChangeSort(event) {
    setSortBy(event.target.value);
  }

  return (
    <div className="Tasks">
      <h3>Tasks</h3>
      <div className="sortBy" onChange={onChangeSort}>
        {sortOptionsButtons}
      </div>
      <div className="displayRange"></div>
      <TaskList
        items={props.items}
        currentTask={props.currentTask}
        changeLocalItems={props.changeLocalItems}
        changeCurrentTask={props.changeCurrentTask}
        sortBy={sortBy}
      />
    </div>
  );
}
