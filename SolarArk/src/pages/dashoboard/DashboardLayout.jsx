import React from 'react'
import {Outlet} from 'react-router-dom'
import DashboardNavbar from './components/DashboardNavbar'
import DashboardFooter from './components/DashboardFooter'
import Sidebar from './components/Sidebar'

const DashboardLayout = () => {
  return (
    <div>
      <DashboardNavbar/>
      <Sidebar/>
       <Outlet/>
       <DashboardFooter/>
    </div>
  )
}

export default DashboardLayout
