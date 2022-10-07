import React from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Button } from '@mui/material';
import { logout } from '../../config';

export default function Header({toggle, signOut}) {
  
  return (
    <nav className="Navbar">
        <IconButton style={{ backgroundColor: '#333', color: '#fff', margin: '0 10px'}} onClick={toggle}>
          <MenuIcon/>
        </IconButton>
        <div className="Navbar-Title">
            HITLIST
        </div>
        <Button style={SignOutButtonStyle} onClick={() => signOut()}>SIGN OUT</Button>
    </nav>
  )
}

const SignOutButtonStyle = { color: '#fff', justifySelf: 'end', margin: '0 0 0 auto', padding: '0 30px 0 0'}