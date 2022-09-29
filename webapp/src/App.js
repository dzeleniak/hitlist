import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import config from './config';
import Header from './Components/Header';
import {Button, TextField, List, ListItem, IconButton, Icon} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Add from '@mui/icons-material/Add';

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
            <TextField style={textFieldStyle} onChange={e => setTaskName(e.target.value)} />
            <IconButton style={buttonStyle} onClick={addTask}> 
              <AddIcon />
            </IconButton>
        </div>
        <List className="Tasklist">
          {dataLoaded && taskList.map(x => 
            <ListItem key={x.key}>{x.taskName}</ListItem>
          )}
        </List>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#000000',
  color: 'white',
  margin: '10px 10px',
}

const textFieldStyle = {
  width: '100%'
}

export default App;
