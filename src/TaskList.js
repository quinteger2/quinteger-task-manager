import React from "react";
import "./TaskList.css";

function TaskListItem(props) {
  return (
    <div className="TaskListItem">
      <p>{`${props.item.content} (${props.item.date.toLocaleDateString()}, ${
        props.item.percentComplete
      }%) ${props.item.person}`}</p>
      <button onClick={() => props.changeCurrentTask(props.item.id)}>
        Edit
      </button>
    </div>
  );
}

export default function TaskList(props) {
  var _items = [];

  switch (props.sortBy) {
    case "content":
      _items = props.items.sort((a, b) => {
        return a.content.toLowerCase() > b.content.toLowerCase();
      });
      break;
    case "date":
      _items = props.items.sort((a, b) => {
        return a.date > b.date;
      });
      break;
    case "percent":
      _items = props.items.sort((a, b) => {
        return a.percentComplete > b.percentComplete;
      });
      break;
    case "person":
      _items = props.items.sort((a, b) => {
        return a.person.toLowerCase() > b.person.toLowerCase();
      });
    default:
      _items = props.items;
  }

  const final_product = _items.map((item) => (
    <TaskListItem
      key={item.id}
      changeCurrentTask={props.changeCurrentTask}
      item={item}
    />
  ));

  return <div className="TaskList">{final_product}</div>;
}
