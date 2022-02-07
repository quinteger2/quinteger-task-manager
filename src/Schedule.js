import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { itemsFromBackend } from "./data.js";
import { v4 as uuid } from "uuid";
import TaskList from "./TaskList.js";
import "./Schedule.css";
import Task from "./Task.js";

const onDragEnd = (result, columns, setColumns, items, setItems) => {
  if (!result.destination) return;
  const { source, destination } = result;

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
  const [items, setItems] = useState(itemsFromBackend);
  const [newContent, setNewContent] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newProject, setNewProject] = useState("No Project");
  const [columns, setColumns] = useState({});

  useEffect(() => {
    //Rebuild columns every render
    const newColumns = [];
    var i = 0;

    const dayInMilliseconds = 24 * 60 * 60 * 1000;

    for (i = 0; i < 4; i++) {
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
    console.log(result);
    setColumns(result);
  }, [props.startDate]);

  console.log(columns);
  
  const onChangeContent = (event) => {
    setNewContent(event.target.value);
  };

  const onChangeTaskDate = (event) => {
    setNewTaskDate(event.target.value);
  };

  const onChangeProject = (event) => {
    setNewProject(event.target.value);
  };

  function handleAdd() {
    //Convert state's columns object to array to find the "Unassigned" column

    const _items = [...items];

    _items.push({
      id: uuid(),
      content: newContent,
      date: new Date(newTaskDate),
      project: newProject,
      percentComplete: 0,
    });

    setItems(_items);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
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
        <div className="addWidget">
          <h3>Add Task</h3>
          <input
            type="text"
            className="newContent"
            value={newContent}
            onChange={onChangeContent}
            placeholder="New Task's Content"
          />
          <input
            type="text"
            className="newTaskDate"
            value={newTaskDate}
            onChange={onChangeTaskDate}
            placeholder="New Task's Date"
          />
          <input
            type="text"
            className="newTaskDate"
            value={newProject}
            onChange={onChangeProject}
            placeholder="New Task's Project"
          />
          <button className="add" onClick={handleAdd}>
            Add
          </button>
        </div>
        <TaskList items={items} />
      </div>
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, columns, setColumns, items, setItems)
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
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
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
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <Task task={item} />
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
