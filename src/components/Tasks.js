import React, { useState } from "react";
import TaskList from "./TaskList";
import "./Tasks.css";

export default function Tasks(props) {
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
          checked={item.prop === sortBy} onChange={onChangeSort}
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
        <input type="radio" value={item.prop} name="filter" />
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
    <div className={"Tasks " + props.writeState}>
      <h3>Tasks</h3>
      <p>Sort By: </p>
      <div className="sortBy">
        {sortOptionsButtons}
        <p>Filter: </p>
      </div>
      <div className="filter" onChange={onChangeFilter}>
        {filterOptionsButtons}
      </div>
      <div className="displayRange"></div>
      <TaskList
        items={props.items}
        currentTask={props.currentTask}
        changeLocalItems={props.changeLocalItems}
        changeCurrentTask={props.changeCurrentTask}
        sortBy={sortBy}
        filter={filter}
        startDate={props.startDate}
        endingDate={props.endingDate}
      />
    </div>
  );
}
