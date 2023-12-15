import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

export const  AdminDashBoard = () => {
    const [auth]=useAuth();
  return (
    <Layout>
        <div className='container-fluid '>
            <div className='row'>
                <h2>Admin Panel</h2>
                <div className='col-md-3'><AdminMenu/></div>
                <div className='col-md-9'>
                    <div className='card w-70 p-3'>
                        <h4>Admin Name: {auth?.user?.name}</h4>
                        <h4>Admin Email: {auth?.user?.email}</h4>
                        <h4>Admin Contact: {auth?.user?.phone}</h4>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
   
  )
}

export default AdminDashBoard