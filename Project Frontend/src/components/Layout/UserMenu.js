import React from 'react'
import { NavLink } from 'react-router-dom'

export const UserMenu = () => {
    return (
        <>
            <ul className="list-group">
                <h4>Dashboard</h4>
                <NavLink to="/dashboard/user/profile" className="list-group-item active" aria-current="true">Profile</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item">Orders</NavLink>
               
            </ul>

        </>
    )
}

export default UserMenu