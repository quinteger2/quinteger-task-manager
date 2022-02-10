import React, { useEffect, useState } from "react";
import "./EditTask.css";
import db from "./firebase";
import { updateDoc, doc } from "firebase/firestore";
import ChangeDate from "./ChangeDate.js";

export default function EditTask(props) {
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [group, setGroup] = useState("");
  const [person, setPerson] = useState("");

  const [oldTask, setOldTask] = useState({});

  async function updateTask(ref, newContent, newDate) {
    console.log(ref);
    try {
      await updateDoc(ref, {
        content: newContent,
        date: newDate,
      });
    } catch (e) {
      console.log("Error updating:", e);
    }
  }

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleSave = (event) => {
    const ref = doc(db, "tasks", oldTask.id);
    updateTask(ref, content, date);
    props.finishEdit(content, date)
  };

  useEffect(() => {
    props.tasks.forEach((item) => {
      if (item.id === props.currentTask) {
        console.log("Over here!");
        setOldTask(item);
        setContent(item.content);
        setDate(item.date);
        console.log(item);
      }
    });
  }, []);

  function changeDate(props) {
    //console.log(new Date(props).toLocaleDateString('en-US'))
    setDate(props);
  }

  return (
    <div className="EditTask">
      <h3>Task Description:</h3>
      <input
        type="text"
        className="newContent"
        value={content}
        onChange={onChangeContent}
      />
      <h3>Task Date:</h3>
      <ChangeDate startDate={date} changeDate={changeDate} />
      <button className="add" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
