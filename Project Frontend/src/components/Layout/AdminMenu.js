import React from 'react'
import { NavLink } from 'react-router-dom'

export const AdminMenu = () => {
    return (
        <>
            <ul className="list-group mt-3">
                <NavLink to="/dashboard/admin/create-category" className="list-group-item active" aria-current="true">Create Category</NavLink>
                <NavLink to="/dashboard/admin/create-game" className="list-group-item">Add Game</NavLink>
                <NavLink to="/dashboard/admin/game" className="list-group-item">All Games</NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item">Users</NavLink>
            </ul>

        </>
    )
}

export default AdminMenu