import React from 'react';
import Style from './Style';
import {getDatabase, onValue, ref} from 'firebase/database';
import { useState, useEffect } from 'react';
import { Button, List, ListItem } from '@mui/material';

export default function Collections({changeSelectedList}) {

  const db = getDatabase()

  const [lists, setLists] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getLists = () => {
    onValue(ref(db, 'lists'), (data) => {
      const list = [];
      data.forEach(x => {
        console.log(x.val());
        list.push({...x.val(), key: x.key});
      });

      setLists([...list]);
    })
  }

  useEffect(()=> {
    getLists();
    setDataLoaded(true);
  }, [])
  
  return (
    <List style={Style.ContainerStyle}>
      {lists.map(x => (
        dataLoaded && (<ListItem key={x.key}>
          <Button style={Style.ButtonStyle} onClick={() => changeSelectedList(x.listName)}>
            {x.listName.toUpperCase()}
          </Button>
        </ListItem>)
      ))}
    </List>
  )
}
