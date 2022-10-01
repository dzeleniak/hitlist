import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {Button, TextField, List, ListItem, IconButton, Icon} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check'
import Style from './Style';

export default function TaskList({selectedList}) {

  const db = getDatabase();

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
    console.log(selectedList);
    set(ref(db, 'tasks/' + uuidv4()),{
      taskName, 
      completed: false,
      taskList: selectedList,
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
    <div style={Style.ContainerStyle}>
        <div style={Style.taskAddStyle}>
            <TextField style={Style.textFieldStyle} onChange={e => setTaskName(e.target.value)} />
            <IconButton style={Style.buttonStyle} onClick={addTask}> 
              <AddIcon />
            </IconButton>
        </div>
        <List style={Style.taskListStyle}>
          {dataLoaded && taskList.map(x => 
              (x.taskList === selectedList && !x.completed) && (
                <ListItem style={Style.listItemStyle} key={x.key}>
                  <IconButton style={Style.listItemButtonStyle} onClick={() => completeTask(x.key)}>
                    <CheckIcon />
                  </IconButton>
                  <div style={Style.listItemTextStyle}>
                    {x.taskName}
                  </div>
                </ListItem>
              )
          )}
        </List>
      </div>
    )
}
