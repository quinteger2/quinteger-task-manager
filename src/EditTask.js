import React, { useEffect, useState } from "react";
import "./EditTask.css";
import db from "./firebase";
import { updateDoc, doc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function EditTask(props) {
  const [content, setContent] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [group, setGroup] = useState("");
  const [person, setPerson] = useState("");
  const [percentComplete, setPercentComplete] = useState("");

  const [oldTask, setOldTask] = useState({});

  async function updateTask(
    ref,
    _content,
    _date,
    _group,
    _person,
    _percentComplete
  ) {

    console.log(`Percent Complete: ${percentComplete}`)

    try {
      await updateDoc(ref, {
        content: _content,
        date: new Date(_date),
        group: _group,
        person: _person,
        percentComplete: _percentComplete,
      });
    } catch (e) {
      console.log("Error updating:", e);
    }
  }

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
    const ref = doc(db, "tasks", oldTask.id);
    updateTask(ref, content, newTaskDate, group, person, percentComplete);
    props.changeLocalItems(content, new Date(newTaskDate), group, person, percentComplete);
  };

  useEffect(() => {
    props.tasks.forEach((item) => {
      if (item.id === props.currentTask) {
        setOldTask(item);
        setContent(item.content);
        setNewTaskDate(new Date(item.date));
        setGroup(item.group);
        setPerson(item.person);
        setPercentComplete(item.percentComplete)
      }
    });
  }, [props.tasks, props.currentTask]);

  //console.log(date);

  return (
    <div className="EditTask">
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
        <input
          type="text"
          className="newTaskDate"
          value={newTaskDate}
          onChange={onChangeTaskDate}
          placeholder="New Task's Date"
        />
      </div>
      <div className="inputGroup">
        <button className="add" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
