import { v4 as uuid } from "uuid";

export const itemsFromBackend = [
  {
    id: uuid(),
    content: "First task",
    date: new Date("February 3, 2022"),
    column: "Unassigned",
    project: "First Project",
    percentComplete: 10,
  },
  {
    id: uuid(),
    content: "Second task",
    date: new Date("February 4, 2022"),
    column: "Unassigned",
    project: "First Project",
    percentComplete: 10,
  },
  {
    id: uuid(),
    content: "Third task",
    date: new Date("February 5, 2022"),
    project: "First Project",
    column: "To do",
    percentComplete: 10,
  },
  {
    id: uuid(),
    content: "Fourth task",
    date: new Date("February 6, 2022"),
    column: "Unassigned",
    percentComplete: 10,
  },
  {
    id: uuid(),
    content: "Fifth task",
    date: new Date("February 7, 2022"),
    column: "Unassigned",
    percentComplete: 10,
  },
];

export const projects = [{ name: "First Project" }];
