import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { writeData } from "../firebase";

export default function AddTask(props) {
  const [newContent, setNewContent] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(new Date());
  const [newGroup, setNewGroup] = useState("No Group");
  const [newPerson, setNewPerson] = useState("Unassigned");

  const onChangeContent = (event) => {
    setNewContent(event.target.value);
  };

  const onChangeTaskDate = (event) => {
    setNewTaskDate(event.target.value);
  };

  const onChangeGroup = (event) => {
    setNewGroup(event.target.value);
  };

  const onChangePerson = (event) => {
    setNewPerson(event.target.value);
  };

  function handleAdd() {
    
    if (newTaskDate === undefined) {
      alert("Is the date filled in?");
    } else {
      const _items = [...props.items];

      const newTask = {
        id: uuid(),
        content: newContent,
        date: newTaskDate,
        group: newGroup,
        person: newPerson,
        percentComplete: 0,
      };

      _items.push(newTask);

      props.setItems(_items);
      /*     async function writeData() {
      //if you want an auto generated id
      //const docRef = await addDoc(collection(db, "tasks"), docData);
      //console.log("Document written with ID: ", docRef.id);

      //If you want to set the id yourself
      await setDoc(doc(db, "tasks", newTask.id), newTask);
    } */

      writeData(newTask);
    }
  }

  return (
    <div className="addWidget" style={{ width: props.addWidth }}>
      <h3>Add Task</h3>
      <input
        type="text"
        className="newContent"
        value={newContent}
        onChange={onChangeContent}
        placeholder="New Task's Content"
      />
      <input
        type="date"
        className="newTaskDate"
        value={newTaskDate}
        onChange={onChangeTaskDate}
        placeholder="New Task's Date"
      />
      <input
        type="text"
        className="newGroup"
        value={newGroup}
        onChange={onChangeGroup}
        placeholder="New Task's Group"
      />
      <input
        type="text"
        className="newPerson"
        value={newPerson}
        onChange={onChangePerson}
        placeholder="New Task's Person"
      />
      <br />
      <button className="add" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
