import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Tasks from "./Tasks.js";
import "./Schedule.css";
import CalendarTask from "./CalendarTask.js";
import { getTasks, updateDate } from "../firebase";
import EditTask from "./EditTask.js";
import AddTask from "./AddTask.js";
//import { AppContext } from "../AppContext";

const onDragEnd = (result, columns, setColumns, items, currentTask, setCurrentTask) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if(currentTask !== "") {
    //alert("I have to close Edit Task, so that it doesn't conflict with the schedule change you are making")
    setCurrentTask("")
  }

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });

    //Change the task's date to match the destination's date

    const _items = [...items];

    _items.forEach((task) => {
      var changedTask = task;
      destItems.forEach((columnItem) => {
        if (task.id === columnItem.id) {
          changedTask.date = new Date(parseInt(destination.droppableId, 10));
          updateDate(task.id, new Date(parseInt(destination.droppableId, 10)));
        }
      });
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Schedule(props) {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState({});
  const [currentTask, setCurrentTask] = useState("");
  const [editWriteState, setEditWriteState] = useState("");
  const dayInMilliseconds = 24 * 60 * 60 * 1000;

  useEffect(() => {
    //Rebuild columns every render
    const newColumns = [];
    var i = 0;

    for (i = 0; i < 5; i++) {
      newColumns.push([
        props.startDate + dayInMilliseconds * i,
        {
          items: [],
        },
      ]);
    }

    //Loop through the tasks
    items.forEach((task) => {
      //Loop through the columns to find the appropriate one for this item
      newColumns.forEach((column) => {
        if (task.date !== undefined) {
          if (column[0] === task.date.getTime()) {
            column[1].items.push(task);
          }
        }
      });
    });

    //Back to an object of objects
    const result = {};

    newColumns.forEach((obj) => {
      result[obj[0]] = obj[1];
    });

    //console.log(result)
    setColumns(result);
  }, [props.startDate, items, dayInMilliseconds]);

  useEffect(() => {
    const _items = [];
    getTasks(_items).then(() => {
      setItems(_items);
    });
  }, []);


  const changeCurrentTask = (currentTask) => {
    setCurrentTask(currentTask);
  };

  const changeEditWriteState = (editWriteState) => {
    setEditWriteState(editWriteState);
    setTimeout(() => {
      setEditWriteState("");
    }, 3000);
  };

  function changeLocalItems(content, date, group, person, percentComplete) {
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
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        border: "1px solid black",
      }}
    >
      <div
        className="controlPanel"
        style={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Manage Tasks</h2>
        <AddTask items={items} setItems={setItems} addWidth="12vw" />
        {currentTask === "" ? (
          <Tasks
            items={items}
            sortBy="content"
            changeCurrentTask={changeCurrentTask}
            writeState={editWriteState}
            startDate={props.startDate}
            endingDate={props.startDate + dayInMilliseconds * 4}
            taskWidth="12vw"
          />
        ) : (
          <EditTask
            tasks={items}
            currentTask={currentTask}
            changeLocalItems={changeLocalItems}
            changeWriteState={changeEditWriteState}
            editWidth="12vw"
          />
        )}
      </div>
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, columns, setColumns, items, currentTask, setCurrentTask)
        }
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>
                {new Date(parseInt(columnId, 10)).toLocaleDateString("en-US")}
              </h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : new Date(parseInt(columnId, 10)).getDay() === 0 ||
                              new Date(parseInt(columnId, 10)).getDay() === 6
                            ? "orange"
                            : "lightgrey",
                          padding: 4,
                          width: "12vw",
                          minHeight: 500,
                          borderRadius: "1rem",
                          boxShadow: ".8rem .8rem .8rem .2rem #364E8E",
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: ".5rem",
                                      margin: ".25rem",
                                      minHeight: "2rem",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                      borderRadius: "1rem",
                                    }}
                                  >
                                    <CalendarTask task={item} />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Schedule;
