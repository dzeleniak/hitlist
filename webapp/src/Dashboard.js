import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./config";
import Header from './Components/Header/Header';
import Collections from './Components/Collections/Collections';
import TaskList from './Components/TaskList/TaskList';

function Dashboard() {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);


  const [showCollections, setShowCollections] = useState(false);
  const [selectedList, setSelectedList] = useState("default");

  const toggleShowCollections = () => {
    const val = showCollections
    setShowCollections(!val);
  }

  const signOut = () => {
    logout();
    return navigate("/");
  }

  const changeSelectedList = (x) => {
    setSelectedList(x);
  }

  return (
    <div className="dashboard">
        <Header toggle={toggleShowCollections} signOut={signOut} />
        <div className="Main-Container">
            {showCollections && <Collections changeSelectedList={changeSelectedList}/>}
            <TaskList selectedList={selectedList} uid={user.uid}/>
        </div>
     </div>
  );
}
export default Dashboard;