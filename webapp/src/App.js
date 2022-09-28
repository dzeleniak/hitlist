import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import config from './config';



function App() {
  const app = initializeApp(config);
  const db = getDatabase(app);

  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getTask = () => {
    get(ref(db, 'tasks')).then((snapshot) => {
      if(snapshot.exists()) {
        const data = snapshot.val();
        const tasks = Object.values(data);
        setTaskList(tasks);
      }
    });

    console.log(taskList);
  }

  const addTask = () => {
    set(ref(db, 'tasks/' + uuidv4()),{
      taskName, 
      completed: false
    });
    getTask();
  }

  useEffect(()=> {
    getTask();
    setDataLoaded(true);
  }, [])

  return (
    <div className="App">
      <div >
          <label for="TaskName">Task Name</label><br/>
          <input onChange={e => setTaskName(e.target.value)} type="text" name="TaskName" id="taskName" /><br/>
          <button onClick={addTask}>Click</button>
      </div>
      <div>
        {dataLoaded && taskList.map(x => 
          <li key={uuidv4()}>{x.taskName}</li>
        )}
      </div>
    </div>
  );
}

export default App;
