import React from "react";
import './TaskList.css'

export default function TaskList(props) {
  const _items = props.items
    .sort((a, b) => {
      return a.content.toLowerCase() > b.content.toLowerCase();
    })
    .map((item) => (
      <p key={item.id}>{`${item.content} (${item.date.toLocaleDateString()}, ${
        item.percentComplete
      }%)`}</p>
    ));
  return (
    <div
      className='TaskList'
    >
        <h3>Task List</h3>
      {_items}
    </div>
  );
}
