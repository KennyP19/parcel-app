import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css';
import { signOut, getAuth } from 'firebase/auth';
import app from '../firebaseconfig';
import { ReactComponent as Logo } from '../logo.svg';

const Sidebar = () => {
    const auth = getAuth(app)

    const signout = async (e) => {        
        await signOut(auth)
    }

    return (
    <div className='sidebar'>
        <Logo className='App-logo'/>
        <NavLink to={'/dashboard/overview'} className='sidebar-link'><div className="sidebar-menu-item-text">Overview</div></NavLink>
        <NavLink to={'/dashboard/statistics'} className='sidebar-link'><div className="sidebar-menu-item-text">Statistics</div></NavLink>
        <NavLink to={'/dashboard/users'} className='sidebar-link'><div className="sidebar-menu-item-text">Users</div></NavLink>
        <NavLink to={'/dashboard/parcels'} className='sidebar-link'><div className="sidebar-menu-item-text">Parcels</div></NavLink>
        <button className='sidebar-link signout' onClick={signout}><div className="sidebar-menu-item-text">Sign out</div></button>
    </div>
    )
}

export default Sidebar