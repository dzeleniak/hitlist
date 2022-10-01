import React from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
export default function Header({toggle}) {
  
  return (
    <nav className="Navbar">
        <IconButton style={{ backgroundColor: '#333', color: '#fff', margin: '0 10px'}} onClick={toggle}>
          <MenuIcon/>
        </IconButton>
        <div className="Navbar-Title">
            HITLIST
        </div>
    </nav>
  )
}
