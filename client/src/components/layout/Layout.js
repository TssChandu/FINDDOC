import React, { useState } from 'react'
import { FaUserMd } from "react-icons/fa";
import { Badge } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/doctor-appointment-logo.png'
import './layout.css'
import { useSelector } from 'react-redux';


const Layout = ({ children }) => {
   const { user } = useSelector((state) => state.user)
   // console.log(user)
   const navigate = useNavigate()
   const [collapsed, setCollapsed] = useState(false)
   const location = useLocation()
   const permClose = window.matchMedia('(max-width:650px)');
   function render(e) {
      if (e.matches) {
         if (!collapsed) {
            setCollapsed(true);
         }
      }
   }
   render(permClose);
   permClose.addEventListener('change', render);
   const userMenu = [
      {
         name: "Home",
         path: "/",
         icon: "ri-home-8-line",
      },
      {
         name: "Appointments",
         path: "/appointments",
         icon: "ri-file-list-line",
      },
      {
         name: "Apply Doctor",
         path: "/apply-doctor",
         icon: "",
      },
   ];

   const doctorMenu = [
      {
         name: "Home",
         path: "/",
         icon: "ri-home-8-line",
      },
      {
         name: "Appointments",
         path: "/doctor/appointments",
         icon: "ri-file-list-line",
      },
      {
         name: "Profile",
         path: `/doctor/profile/${user?._id}`,
         icon: "ri-profile-line",
      },
   ];

   const adminMenu = [
      {
         name: "Home",
         path: "/",
         icon: "ri-home-8-line",
      },
      {
         name: "Users",
         path: "/admin/userslist",
         icon: "ri-user-3-line",
      },
      {
         name: "Doctors",
         path: "/admin/doctorslist",
         icon: "ri-hospital-line",
      },
   ];

   const setCollapsedMenu = () => {
      setCollapsed(true)
   }

   const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
   const userType = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User"

   return (
      <div className='main'>
         <div className='d-flex layout'>
            <div className={`${collapsed ? "collapsed-sidebar" : 'sidebar'}`} >
               <div className="sidebar-header">
                  {/* <h1 className='logo m-1 mb-0'>FD</h1> */}
                  <Link to="/">
                     <img src={logo} alt="logo" className="logo" style={{ width: "80px" }} />
                  </Link>
                  <p className='normal-text mt-3' style={{ color: "rgb(229, 255, 0)", marginLeft: "10px" }}>{userType}</p>
               </div>
               <div className="menu">
                  {menuToBeRendered.map(item => {
                     const isActive = location.pathname === item.path
                     return (<Link to={item.path} key={item.name}>
                        <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                           {item.icon && (<i className={item.icon}></i>)}
                           {item.name === "Apply Doctor" && <FaUserMd className='react-icon' />}
                           {!collapsed && <p >{item.name}</p>}
                        </div>
                     </Link>)
                  })}
                  <div className={`d-flex menu-item`} onClick={() => {
                     localStorage.clear()
                     navigate('/login')
                  }}>
                     <i className="ri-logout-box-line"></i>
                     {!collapsed && <p >Logout</p>}
                  </div>
               </div>
            </div>
            <div className='content'>
               <div className='header'>
                  {collapsed ? <i className="ri-menu-2-fill hamburger-icon" onClick={() => setCollapsed(false)}></i>
                     : <i className="ri-close-fill hamburger-icon" onClick={setCollapsedMenu}></i>}
                  <div className='d-flex align-items-center'>
                     <Badge count={user?.unseenNotifications.length} onClick={() => {
                        navigate('/notifications')
                     }}>
                        <i className="ri-notification-3-line hamburger-icon"></i>
                     </Badge>
                     <Link className="nav-anchor mx-3" to="/profile">{user?.name}</Link>
                  </div>
               </div>
               <div className="body">
                  {children}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Layout