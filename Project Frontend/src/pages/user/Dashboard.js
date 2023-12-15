import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/Layout/UserMenu'

export const Dashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"Dashboard - Ecommercs App"}>
      <div className='container-fluid p-3 m-3 '>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h4>User Name: {auth?.user?.name}</h4>
              <h4>User Email: {auth?.user?.email}</h4>
              <h4>User Contact: {auth?.user?.phone}</h4>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}
