import React, { useState } from "react";
import "./EditTask.css";
import { updateTask } from "../firebase";

export default function EditTask(props) {
  
  const [content, setContent] = useState(props.currentTask.content);
  const [date, setNewTaskDate] = useState(new Date(props.currentTask.date));
  const [group, setGroup] = useState(props.currentTask.group);
  const [person, setPerson] = useState(props.currentTask.person);
  const [percentComplete, setPercentComplete] = useState(props.currentTask.percentComplete);

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onChangeGroup = (event) => {
    setGroup(event.target.value);
  };

  const onChangePerson = (event) => {
    setPerson(event.target.value);
  };

  const onChangePercentComplete = (event) => {
    setPercentComplete(event.target.value);
  };

  const onChangeTaskDate = (event) => {
    setNewTaskDate(event.target.value);
  };

  const handleSave = (event) => {
    console.log(props.currentTask.id + ' ' + content + ' ' + date + ' ' + group + ' ' + person + ' ' + percentComplete + ' ' + props.changeWriteState)
    
    updateTask(
      props.currentTask.id,
      content,
      date,
      group,
      person,
      percentComplete,
      props.changeWriteState
    );
    props.changeCurrentTaskID("")
    props.forceFetchTasks()
  };

  console.log(props.currentTask)

  return (
    <div className="EditTask" style={{ width: props.editWidth }}>
      <div className="inputGroup">
        <p>Task Description:</p>
        <input
          type="text"
          className="newContent"
          value={content}
          onChange={onChangeContent}
        />
      </div>
      <div className="inputGroup">
        <p>Group</p>
        <input
          type="text"
          className="newGroup"
          value={group}
          onChange={onChangeGroup}
        />
      </div>
      <div className="inputGroup">
        <p>Percent Complete</p>
        <input
          type="text"
          className="newPercentComplete"
          value={percentComplete}
          onChange={onChangePercentComplete}
        />
      </div>
      <div className="inputGroup">
        <p>Person</p>
        <input
          type="text"
          className="newPerson"
          value={person}
          onChange={onChangePerson}
        />
      </div>
      <div className="inputGroup">
        <p>Date</p>
        <input
          type="text"
          className="date"
          value={date}
          onChange={onChangeTaskDate}
        />
      </div>
      <div className="inputGroup">
        <button className="delete" onClick={() => alert("Are you crazy?")}>
          Delete
        </button>
        <button className="back" onClick={() => props.changeCurrentTaskID("")}>
          Back
        </button>
        <button className="save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
