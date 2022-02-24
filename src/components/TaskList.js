import React from "react";
import "./TaskList.css";

function TaskListItem(props) {
  return (
    <div className="TaskListItem">
      <p>{`${props.item.content} (${props.item.date.toLocaleDateString()}, ${
        props.item.percentComplete
      }%) ${props.item.person}`}</p>
      <button onClick={() => props.changeCurrentTaskID(props.item.id)}>
        Edit
      </button>
    </div>
  );
}

export default function TaskList(props) {
  var sortedItems = [];

  switch (props.sortBy) {
    case "content":
      sortedItems = props.items.sort((a, b) => {
        return a.content.toLowerCase() > b.content.toLowerCase();
      });
      break;
    case "date":
      sortedItems = props.items.sort((a, b) => {
        return a.date > b.date;
      });
      break;
    case "percent":
      sortedItems = props.items.sort((a, b) => {
        return a.percentComplete > b.percentComplete;
      });
      break;
    case "person":
      sortedItems = props.items.sort((a, b) => {
        return a.person.toLowerCase() > b.person.toLowerCase();
      });
      break;
    default:
      sortedItems = props.items;
  }

  var filteredItems = [];

  switch (props.filter) {
    case "currentPeriod":
      filteredItems = sortedItems.filter(
        (item) => item.date >= props.startDate && item.date <= props.endingDate
      );
      break;
    default:
      filteredItems = sortedItems;
  }

  const final_product = filteredItems.map((item) => (
    <TaskListItem
      key={item.id}
      changeCurrentTaskID={props.changeCurrentTaskID}
      item={item}
    />
  ));

  return <div className="TaskList">{final_product}</div>;
}
