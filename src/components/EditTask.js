import React, { useEffect, useState } from "react";
import "./EditTask.css";
import { updateTask } from "../firebase";

export default function EditTask(props) {
  const [content, setContent] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [group, setGroup] = useState("");
  const [person, setPerson] = useState("");
  const [percentComplete, setPercentComplete] = useState("");

  const [oldTask, setOldTask] = useState({});

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
    //console.log(newTaskDate);
    setNewTaskDate(event.target.value);
  };

  const handleSave = (event) => {
    updateTask(
      oldTask.id,
      content,
      newTaskDate,
      group,
      person,
      percentComplete,
      props.changeWriteState
    );
    props.changeLocalItems(
      content,
      new Date(newTaskDate),
      group,
      person,
      percentComplete
    );
  };

  useEffect(() => {
    props.tasks.forEach((item) => {
      if (item.id === props.currentTask) {
        setOldTask(item);
        setContent(item.content);
        setNewTaskDate(new Date(item.date));
        setGroup(item.group);
        setPerson(item.person);
        setPercentComplete(item.percentComplete);
      }
    });
    //console.log(setNewTaskDate);
  }, [props.tasks, props.currentTask]);

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
          className="newTaskDate"
          value={newTaskDate}
          onChange={onChangeTaskDate}
        />
      </div>
      <div className="inputGroup">
        <button className="delete" onClick={() => alert("Are you crazy?")}>
          Delete
        </button>
        <button className="save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
