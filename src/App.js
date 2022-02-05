import "./App.css";
import Schedule from "./Schedule.js";

function App() {
  return <Schedule startDate={new Date().setHours(0, 0, 0, 0)}/>;
}

export default App;
