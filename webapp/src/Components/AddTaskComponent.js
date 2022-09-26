import React from 'react'
import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

export default function AddTaskComponent() {

    const [task, setTask] = useState("");

    const db = getDatabase();

    const postToDB = () => {
        set(ref(db, 'tasks/' + uuidv4()), {
        taskName: task,
        completed: false,
        });
    }

    return (
        <div >
            <label for="TaskName">Task Name</label><br/>
            <input onChange={e => setTask(e.target.value)} type="text" name="TaskName" id="taskName" /><br/>
            <button onClick={postToDB}>Click</button>
        </div>
    )
}
