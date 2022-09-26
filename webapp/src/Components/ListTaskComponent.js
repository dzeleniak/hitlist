import React from 'react'

import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';

export default function ListTaskComponent() {
    const [taskList, setTaskList] = useState({});
    const db = getDatabase();
    const tasksRef = ref(db, 'tasks/');

    const readTasks = () => {
        onValue(tasksRef, snapshot => {
            const data = snapshot.val();
            setTaskList(data);
        })
    }
  
    return (
        <div>

        </div>
    )
}
