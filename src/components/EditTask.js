import React, { useEffect, useState } from "react";
import "./EditTask.css";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

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
    try {
      await updateDoc(ref, {
        content: _content,
        date: new Date(_date),
        group: _group,
        person: _person,
        percentComplete: _percentComplete,
      }).then(props.changeWriteState("success"));
    } catch (e) {
      props.changeWriteState("error");
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
    //console.log(newTaskDate);
    setNewTaskDate(event.target.value);
  };

  const handleSave = (event) => {
    const ref = doc(db, "tasks", oldTask.id);

    //console.log(newTaskDate);
    //const newDate = new Date(newTaskDate.replace(/-/g,'/').replace('T',' ')); //need to reformat HTML date object's string to be kinder to JS

    updateTask(ref, content, newTaskDate, group, person, percentComplete);
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
    <div className="EditTask" style={{width: props.editWidth}}>
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
        />
      </div>
      <div className="inputGroup">
        <button className="Save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
