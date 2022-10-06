import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {Button, TextField, List, ListItem, IconButton, Icon} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check'
import Header from './Components/Header/Header';
import Collections from './Components/Collections/Collections';
import TaskList from './Components/TaskList/TaskList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login'
import Register from "./Auth/Register";
import Reset from "./Auth/Reset";
import Dashboard from "./Dashboard";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
