import React, { useState, useEffect } from "react";
import "./Groups.css";
import { getGroups } from "../firebase";
import { Link } from "react-router-dom";
import EditTask from "./EditTask";

function GroupList(props) {
  const [displayGroups, setDisplayGroups] = useState([]);

  const { changeCurrentGroup, setGroupsWithDetails } = props;

  useEffect(() => {
    const groups = [];
    const groupsWithDetails = [];
    if (window.confirm("Firestore?")) {
      //getGroups returns two lists: a deduped array of group names (groups) and
      //an array of objects that has every task's name with its associated group (groupsWithTasks)

      getGroups(groups, groupsWithDetails).then(() => {
        const _displayGroups = groups.map((item) => {
          return (
            <div key={item} className="groupLine">
              <span
                className="itemName"
                onClick={() => {
                  changeCurrentGroup(item);
                }}
              >
                {item}
              </span>
            </div>
          );
        });
        setDisplayGroups(_displayGroups);
        setGroupsWithDetails(groupsWithDetails);
      });
    } else {
      alert("No Firestore? Hurmph");
    }
  }, []);
  return (
    <div className="GroupList">
      <h3>Current groups</h3>
      {displayGroups}
      <br />
      <Link to="/" style={{ textDecoration: "none", fontSize: "2em" }}>
        Home
      </Link>
    </div>
  );
}

function ViewGroup(props) {
  const justThisGroup = props.groupsWithDetails.filter((item) => {
    if (item.group === props.group) {
      return item;
    }
  });

  const displayList = justThisGroup.map((item) => {
    return (
      <div key={item.id} style={{ margin: ".5em" }}>
        <span
          onClick={() => props.changeCurrentTaskID(item.id)}
          className="itemName"
        >
          {item.content}
        </span>
      </div>
    );
  });

  return (
    <div style={{ margin: "0 auto;", textAlign: "center" }}>
      <h1>{props.group}</h1>
      {displayList}
      <button style={{fontSize:"2em"}}
        onClick={() => {
          props.changeCurrentGroup("");
        }}
      >
        Go back
      </button>
    </div>
  );
}
export default function Groups() {
  const [currentGroup, setCurrentGroup] = useState("");
  const [currentTaskID, setCurrentTaskID] = useState("");
  const [groupsWithDetails, setGroupsWithDetails] = useState([]);

  function changeCurrentGroup(item) {
    setCurrentGroup(item);
  }

  const changeCurrentTaskID = (id) => {
    setCurrentTaskID(id);
  };

  const currentTask = {};

  if (currentTaskID !== "") {
    groupsWithDetails.forEach((item) => {
      //Loop through the tasks until we find the current task
      if (item.id === currentTaskID) {
        currentTask.id = item.id;
        currentTask.content = item.content;
        currentTask.date = item.date;
        currentTask.group = item.group;
        currentTask.person = item.person;
        currentTask.percentComplete = item.percentComplete;
      }
    });
  }

  return currentGroup === "" ? (
    <GroupList
      changeCurrentGroup={changeCurrentGroup}
      setGroupsWithDetails={setGroupsWithDetails}
    />
  ) : currentTaskID === "" ? (
    <ViewGroup
      group={currentGroup}
      groupsWithDetails={groupsWithDetails}
      changeCurrentGroup={changeCurrentGroup}
      changeCurrentTaskID={changeCurrentTaskID}
    />
  ) : (
    <EditTask
      currentTask={currentTask}
      changeWriteState={() => console.log("Add support for this")}
      changeCurrentTaskID={changeCurrentTaskID}
      editWidth="80vw"
    />
  );
}
