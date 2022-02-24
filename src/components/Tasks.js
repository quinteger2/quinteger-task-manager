import React, { useState } from "react";
import TaskList from "./TaskList";
import "./Tasks.css";

export default function Tasks(props) {
  //Props required:
  //writeState - indicates if a write (from EditTask) was successful or not. "" is acceptable if no write is recent
  //items - array of tasks which comes from Firestore
  //currentTask - id of the task to be edited
  //changeLocalItems - function to change the local items array (stored separately from Firestore's list) to the passed in data for the currentTask
  //changeCurrentTask - function to change the currentTask
  //startDate - beginning of calendar range
  //endingDate - end of calendar range

  const [sortBy, setSortBy] = useState("content");
  const [filter, setFilterBy] = useState("all");
  const sortOptions = [
    { label: "Content", prop: "content" },
    { label: "Percent Complete", prop: "percent" },
    { label: "Date", prop: "date" },
    { label: "Person", prop: "person" },
  ];

  const sortOptionsButtons = sortOptions.map((item) => {
    return (
      <div key={item.prop}>
        <input
          type="radio"
          value={item.prop}
          name="sortBy"
          checked={item.prop === sortBy}
          onChange={onChangeSort}
        />
        <label htmlFor="html">{item.label}</label>
        <br />
      </div>
    );
  });

  const filterOptions = [
    { label: "Only tasks in this period", prop: "currentPeriod" },
    { label: "All tasks", prop: "all" },
  ];

  const filterOptionsButtons = filterOptions.map((item) => {
    return (
      <div key={item.prop}>
        <input
          type="radio"
          value={item.prop}
          name="filter"
          checked={item.prop === filter}
          onChange={onChangeFilter}
        />
        <label htmlFor="html">{item.label}</label>
        <br />
      </div>
    );
  });

  function onChangeSort(event) {
    setSortBy(event.target.value);
  }

  function onChangeFilter(event) {
    setFilterBy(event.target.value);
  }

  return (
    <div
      className={"Tasks " + props.writeState}
      style={{ width: props.taskWidth }}
    >
      <h3>Tasks</h3>
      <p>Sort By: </p>
      <div className="sortBy">
        {sortOptionsButtons}
        <p>Filter: </p>
      </div>
      <div className="filter">{filterOptionsButtons}</div>
      <div className="displayRange"></div>
      <TaskList
        items={props.items}
        currentTaskID={props.currentTaskID}
        changeLocalItems={props.changeLocalItems}
        changeCurrentTaskID={props.changeCurrentTaskID}
        sortBy={sortBy}
        filter={filter}
        startDate={props.startDate}
        endingDate={props.endingDate}
      />
    </div>
  );
}
