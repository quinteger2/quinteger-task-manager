import { getTasks } from "../firebase";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Mobile() {
  //writeState - indicates if a write (from EditTask) was successful or not. "" is acceptable if no write is recent
  //tasks - array of tasks which comes from Firestore
  //currentTaskID - id of the task to be edited
  //changeLocalItems - function to change the local items array (stored separately from Firestore's list)
  //changeCurrentTaskID - function to change the currentTaskID
  //startDate - beginning of calendar range
  //endingDate - end of calendar range

  const [tasks, setTasks] = useState([]);

  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const numberOfDaysToOffset = 4;

  const [currentTaskID, setCurrentTaskID] = useState("");
  const [currentTask, setCurrentTask] = useState({});
  const [_startDate, setLocalStartDate] = useState(new Date());
  const [_endingDate, setLocalEndingDate] = useState(
    new Date(new Date().getTime() + numberOfDaysToOffset * dayInMilliseconds)
  );
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endingDate, setEndingDate] = useState(
    new Date(new Date().getTime() + numberOfDaysToOffset * dayInMilliseconds)
  );

  const changeLocalItems = (content, date, group, person, percentComplete) => {
    const _items = [...tasks];

    _items.forEach((item) => {
      if (item.id === currentTaskID) {
        item.content = content;
        item.date = date;
        item.group = group;
        item.person = person;
        item.percentComplete = percentComplete;
      }
    });

    setTasks(_items);
    setCurrentTaskID("");
  };

  const changeCurrentTaskID = (currentTaskID) => {
    //If we are setting currentTaskID to a value, we want to get the whole task for that ID now. Then we can pass that to EditTask (if chosen)
    if (currentTaskID !== "") {
      const _currentTask = {};
      tasks.forEach((item) => {
        if (item.id === currentTaskID) {
          console.log("Content is: " + item.content)
          _currentTask.id = item.id
          _currentTask.content = item.content;
          _currentTask.date = new Date(item.date);
          _currentTask.group = item.group;
          _currentTask.person = item.person;
          _currentTask.percentComplete = item.percentComplete;
        }
      });
      //write this new task to state
      setCurrentTask(_currentTask)
    }
    //this gets set to currentTaskID, whether it is a value, or the empty string
    setCurrentTaskID(currentTaskID);
  };

  const fetchTasks = () => {
    if (window.confirm("Firestore?")) {
      const _items = [];
      getTasks(_items).then(() => {
        setTasks(_items);
      });
    } else {
      alert("Firestore rejected");
    }

  }

  useEffect(() => {
    fetchTasks()
  }, []);

  return (
    <>
      <Link to="/groups" style={{ textDecoration: "none", fontSize: "2em" }}>
        Groups
      </Link>
      {currentTaskID === "" ? (
        <div>
          <div
            className="inputGroup"
            style={{ display: "flex", flexDirection: "column" }}
          >
            Start Date
            <input
              type="text"
              className="startDate"
              value={_startDate}
              onChange={(event) => setLocalStartDate(event.target.value)}
              style={{ fontSize: "1rem" }}
            />
            Ending Date
            <input
              type="text"
              className="endingDate"
              value={_endingDate}
              onChange={(event) => setLocalEndingDate(event.target.value)}
              style={{ fontSize: "1rem" }}
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
            items={tasks}
            currentTaskID=""
            changeLocalItems={changeLocalItems}
            changeCurrentTaskID={changeCurrentTaskID}
            startDate={startDate}
            endingDate={endingDate}
            taskWidth="80vw"
          />
          <AddTask items={tasks} setTasks={setTasks} addWidth="80vw" />
        </div>
      ) : (
        <EditTask
          currentTask={currentTask}
          changeWriteState={() => console.log("Add support for this")}
          changeCurrentTaskID={changeCurrentTaskID}
          forceFetchTasks={fetchTasks}
          editWidth="80vw"
        />
      )}
    </>
  );
}
