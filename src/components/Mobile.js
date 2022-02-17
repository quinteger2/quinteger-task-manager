import {
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  Timestamp,
  docRef,
} from "firebase/firestore";
import { db } from "../firebase";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../AppContext";


export default function Mobile() {
  //writeState - indicates if a write (from EditTask) was successful or not. "" is acceptable if no write is recent
  //items - array of tasks which comes from Firestore
  //currentTask - id of the task to be edited
  //changeLocalItems - function to change the local items array (stored separately from Firestore's list)
  //changeCurrentTask - function to change the currentTask
  //startDate - beginning of calendar range
  //endingDate - end of calendar range

  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const numberOfDaysToOffset = 4;

  console.log(
    new Date(new Date().getTime() + numberOfDaysToOffset * dayInMilliseconds)
  );

  const [items, setItems] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [_startDate, setLocalStartDate] = useState(new Date());
  const [_endingDate, setLocalEndingDate] = useState(
    new Date(new Date().getTime() + numberOfDaysToOffset * dayInMilliseconds)
  );
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endingDate, setEndingDate] = useState(
    new Date(new Date().getTime() + numberOfDaysToOffset * dayInMilliseconds)
  );

  const changeLocalItems = (content, date, group, person, percentComplete) => {
    const _items = [...items];

    _items.forEach((item) => {
      if (item.id === currentTask) {
        item.content = content;
        item.date = date;
        item.group = group;
        item.person = person;
        item.percentComplete = percentComplete;
      }
    });

    setItems(_items);
    setCurrentTask("");
  };

  const changeCurrentTask = (currentTask) => {
    setCurrentTask(currentTask);
  };

  useEffect(() => {
    const _items = [];

    async function inside() {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      querySnapshot.forEach((doc) => {
        const currentTask = {};

        currentTask.id = doc.data().id;
        currentTask.content = doc.data().content;
        currentTask.date = new Date(doc.data().date.seconds * 1000); //need to get the date from Firestore's format into a proper date object
        currentTask.group = doc.data().group;
        currentTask.person = doc.data().person;
        currentTask.percentComplete = doc.data().percentComplete;
        _items.push(currentTask);
      });
    }
    inside().then(() => {
      setItems(_items);
    });
  }, []);

  const context = useContext(AppContext)
  return (
    <>
    {JSON.stringify(context)}
      {currentTask === "" ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="inputGroup">
            Start Date
            <input
              type="text"
              className="startDate"
              value={_startDate}
              onChange={(event) => setLocalStartDate(event.target.value)}
            />
            Ending Date
            <input
              type="text"
              className="endingDate"
              value={_endingDate}
              onChange={(event) => setLocalEndingDate(event.target.value)}
            />
            <button
              onClick={() => {
                setStartDate(_startDate);
                setEndingDate(_endingDate);
              }}
            >
              Change dates
            </button>
          </div>
          <Tasks
            writeState=""
            items={items}
            currentTask=""
            changeLocalItems={changeLocalItems}
            changeCurrentTask={changeCurrentTask}
            startDate={startDate}
            endingDate={endingDate}
            taskWidth="80vw"
          />
          <AddTask items={items} setItems={setItems} addWidth="80vw" />
        </div>
      ) : (
        <EditTask
          tasks={items}
          currentTask={currentTask}
          changeLocalItems={changeLocalItems}
          changeWriteState={() => console.log("Add support for this")}
          editWidth="80vw"
        />
      )}
    </>
  );
}
