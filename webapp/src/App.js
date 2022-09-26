import './App.css';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import AddTaskComponent from './Components/AddTaskComponent';
import ListTaskComponent from './Components/ListTaskComponent';

function App() {

  return (
    <div className="App">
        <AddTaskComponent db/>
        <ListTaskComponent/>
    </div>
  );
}

export default App;
