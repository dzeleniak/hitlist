import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import config from './config';
import Header from './Components/Header';
import {Button, TextField} from '@mui/material';

function App() {
  const app = initializeApp(config);
  const db = getDatabase(app);

  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getTask = () => {
    onValue(ref(db, 'tasks'), (data) => {
      const list = [];
      data.forEach(x => {
        list.push({...x.val(), key: x.key});
      })
      setTaskList([...list]);
    })
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
      <Header/>
      <div className="Home-Page">
        <div className="TaskAdd">
            <TextField onChange={e => setTaskName(e.target.value)} />
            <Button style={buttonStyle} variant="contained" onClick={addTask}>Add</Button>
        </div>
        <div className="Tasklist">
          {dataLoaded && taskList.map(x => 
            <li key={x.key}>{x.taskName}</li>
          )}
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  display: 'flex',
  backgroundColor: '#000000',
  margin: '10px 0',
  height: '100%',
  maxWidth: '500px'
}
export default App;
