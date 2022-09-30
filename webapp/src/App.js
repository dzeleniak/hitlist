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
import CheckIcon from '@mui/icons-material/Check'

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

  const completeTask = (id) => {
    set(ref(db, 'tasks/' + id + '/completed'), true);
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
        <div className='TaskList'>
          <List style={listStyle}>
            {dataLoaded && taskList.map(x => 
                !x.completed && (
                  <ListItem style={listItemStyle} key={x.key}>
                    <IconButton style={listItemButtonStyle} onClick={() => completeTask(x.key)}>
                      <CheckIcon />
                    </IconButton>
                    <div style={listItemTextStyle}>
                      {x.taskName}
                    </div>
                  </ListItem>
                )
            )}
          </List>
        </div>
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

const listStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const listItemStyle = {
  backgroundColor: '#EEE',
  margin: '10px 0px',
  padding: '10px',
  borderRadius: '10px',
}

const listItemTextStyle = {
  margin: '0 10px',
}

const listItemButtonStyle = {
  backgroundColor: '#DDD'
}

export default App;
