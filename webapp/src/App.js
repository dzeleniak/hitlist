import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import config from './config';
import {Button, TextField, List, ListItem, IconButton, Icon} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check'
import Header from './Components/Header/Header';
import Collections from './Components/Collections/Collections';
import TaskList from './Components/TaskList/TaskList';

function App() {
  const app = initializeApp(config);
  const db = getDatabase(app);

  const [showCollections, setShowCollections] = useState(false);

  const toggleShowCollections = () => {
    const val = showCollections
    setShowCollections(!val);
  }

  return (
    <div className="App">
      <Header toggle={toggleShowCollections} />
      <div className="Main-Container">
        {showCollections && <Collections />}
        <TaskList/>
      </div>
    </div>
  );

}

export default App;
