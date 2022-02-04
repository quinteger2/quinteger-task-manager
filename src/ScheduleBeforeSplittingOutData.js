import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

function Item(props) {
  if (props.item.date !== undefined)
    return (
      <>
        <p>{props.item.content}</p>
        <p>{props.item.date.toLocaleDateString("en-US")}</p>
      </>
    );
  else return <p>{props.item.content}</p>;
}

const itemsFromBackend = [
  {
    id: uuid(),
    content: "First task",
    date: new Date("February 3, 2022"),
    column: "Unassigned",
  },
  { id: uuid(), content: "Second task", column: "Unassigned" },
  { id: uuid(), content: "Third task", column: "To do" },
  { id: uuid(), content: "Fourth task", column: "Unassigned" },
  { id: uuid(), content: "Fifth task", column: "Unassigned" },
];

const columnsFromBackend = {
  ["Monday"]: {
    items: [],
  },
  ["To do"]: {
    items: [],
  },
  ["In Progress"]: {
    items: [],
  },
  ["Done"]: {
    items: [],
  },
  ["Unassigned"]: {
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
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

function Schedule() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [items, setItems] = useState(itemsFromBackend);

  useEffect(() => {
    console.log("Use Effect!");
    //Convert state's columns object to array to find the "Unassigned" column
    const _columns = Object.entries(columns);

    //Loop through the tasks
    items.forEach((task) => {
      console.log(task.column);

      //Loop through the columns to find the appropriate one for this item
      _columns.forEach((column) => {
        if (column[0] === task.column) {
          column[1].items.push(task);
        }
      });
    });

    //Back to an object of objects
    const result = {};

    _columns.forEach((obj) => {
      result[obj[0]] = obj[1];
    });

    setColumns(result);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          //console.log(columnId)
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{columnId}</h2>
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
                          //console.log(item);
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
                                    <Item item={item} />
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
