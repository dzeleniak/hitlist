import './App.css';
import { getDatabase, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [task, setTask] = useState("");

  const postToDB = () => {
    const db = getDatabase();
    set(ref(db, 'tasks/' + uuidv4()), {
      taskName: task,
      completed: false,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <label for="TaskName">Task Name</label><br/>
        <input onChange={e => setTask(e.target.value)} type="text" name="TaskName" id="taskName" /><br/>
        <button onClick={postToDB}>Click</button>
      </header>
    </div>
  );
}

export default App;
