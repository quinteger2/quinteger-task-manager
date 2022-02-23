import React, {useState, useEffect} from "react"
import "./Groups.css";
import { getGroups } from "../firebase";
import { Link } from "react-router-dom";

  function GroupList(props) {
    const [displayGroups, setDisplayGroups] = useState([]);

    const { changeCurrentGroup, setGroupsWithTasks } = props;

    useEffect(() => {
      const groups = [];
      const groupsWithTasks = [];
      if (window.confirm("Firestore?")) {
        //getGroups returns two lists: a deduped array of group names (groups) and an array of objects that has every task's name with its associated group (groupsWithTasks)
        getGroups(groups, groupsWithTasks).then(() => {
          const _displayGroups = groups.map((item) => {
            console.log(item);
            return (
              <div key={item} className="groupLine">
                <span
                  className="itemName"
                  onClick={() => changeCurrentGroup(item)}
                >
                  {item}
                </span>
              </div>
            );
          });
          setDisplayGroups(_displayGroups);
          setGroupsWithTasks(groupsWithTasks);
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
        <Link to="/" style={{ textDecoration: 'none', fontSize:"2em" }}>Home</Link>
      </div>
    );
  }

  function ViewGroup(props) {
    const justThisGroup = props.groupsWithTasks.filter((item) => {
      if (item.group === props.group) {
        return item;
      }
    });

    const displayList = justThisGroup.map((item) => {
      return (
        <div key={item.id}>
          <p>{item.content}</p>
        </div>
      );
    });

    return (
      <div>
        <h1>{props.group}</h1>
        {displayList}
        <button
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
    const [groupsWithTasks, setGroupsWithTasks] = useState([]);

    function changeCurrentGroup(item) {
      setCurrentGroup(item);
    }

    return currentGroup === "" ? (
      <GroupList
        changeCurrentGroup={changeCurrentGroup}
        setGroupsWithTasks={setGroupsWithTasks}
      />
    ) : (
      <ViewGroup
        group={currentGroup}
        groupsWithTasks={groupsWithTasks}
        changeCurrentGroup={changeCurrentGroup}
      />
    );
  }
