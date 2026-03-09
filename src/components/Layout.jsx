import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
// Layout component that renders the Navbar and nested child routes via Outlet
const Layout = () => {
    return (
        <>
            <Navbar />
            {/* Render child route elements here */}
            <Outlet />
        </>
    )
}

export default Layout