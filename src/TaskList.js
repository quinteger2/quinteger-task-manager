import React from "react";
import "./TaskList.css";

function TaskListItem(props) {
  return (
    <div className="TaskListItem">
      <p >{`${props.item.content} (${props.item.date.toLocaleDateString()}, ${
        props.item.percentComplete
      }%)`}</p>
      <button onClick={() => props.changeCurrentTask(props.item.id)}>Edit</button>
    </div>
  );
}

export default function TaskList(props) {
  //console.log(props)
  const _items = props.items
    .sort((a, b) => {
      return a.content.toLowerCase() > b.content.toLowerCase();
    })
    .map((item) => <TaskListItem key={item.id} changeCurrentTask={props.changeCurrentTask} item={item} />);
  return (
    <div className="TaskList">
      <h3>Task List</h3>
      {_items}
    </div>
  );
}
