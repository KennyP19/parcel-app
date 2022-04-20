import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css';
import { signOut, getAuth } from 'firebase/auth';
import app from '../firebaseconfig';
import { ReactComponent as Logo } from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faChartLine, faBoxes, faUnlock } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    const auth = getAuth(app)

    const signout = async (e) => {        
        await signOut(auth)
    }

    return (
    <div className='sidebar'>
        <Logo className='App-logo'/>
        <p className='hr'>Dashboard</p>
        <NavLink to={'/dashboard/statistics'} className='sidebar-link'><div className="sidebar-menu-item-text"><FontAwesomeIcon icon={faChartLine} /><span>Statistics</span></div></NavLink>
        <NavLink to={'/dashboard/users'} className='sidebar-link'><div className="sidebar-menu-item-text"><FontAwesomeIcon icon={faUsers} /><span>Recipients</span></div></NavLink>
        <NavLink to={'/dashboard/parcels'} className='sidebar-link'><div className="sidebar-menu-item-text"><FontAwesomeIcon icon={faBoxes} /><span>Parcels</span></div></NavLink>
        <p className='hr'>User</p>
        <NavLink to={'/dashboard/parcels'} className='sidebar-link'><div className="sidebar-menu-item-text"><FontAwesomeIcon icon={faUser} /><span>Profile</span></div></NavLink>
        <button className='sidebar-link signout' onClick={signout} type='button'><div className="sidebar-menu-item-text" ><FontAwesomeIcon icon={faUnlock} /><span>Sign out</span></div></button>
    </div>
    )
}

export default Sidebar