import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul className='list-unstyled'>
          <NavLink to='/dashboard' className="sidebar-link" activeClassName="active">
            <li  className='sidebar-item'>Dashboard</li>
          </NavLink>
          <NavLink to='/users' className="sidebar-link" activeClassName="active">
            <li  className='sidebar-item'>Users</li>
          </NavLink>
          <NavLink to='/vehicles' className="sidebar-link" activeClassName="active">
            <li  className='sidebar-item'>Vehicles</li>
          </NavLink>
        </ul>
    </div>
  )
}

export default Sidebar