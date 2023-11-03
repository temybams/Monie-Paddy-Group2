import React from 'react';
import { Link } from 'react-router-dom';
import userPhoto from "../../../public/assets/Ellipse 134.svg";
import doticon from "../../../public/assets/Ellipse 141.svg";
import bellicon from "../../../public/assets/notification.png";
import './Topbar.css';

function Topbar() {
  return (
    <nav className="navbar ">
      <div className="container-fluid d-flex justify-content-between align-items-center py-3 px-5 py-3 ">
        <h1 className="Logo px-3">MONIE PADDY</h1>
        <div className="mt-2 align-items-center justify-content-center"> 
            <Link to="/" className="navbar-brand">

            <h1 className='home-link ms-2'>Home</h1>
              <img src={doticon} alt="User Profile" className=" ms-4 user-icon align-items-center d-flex flex-column"/> 
            </Link>
          </div>
        <div className="user-profile d-flex align-items-center">
          
          <div className="d-flex align-items-center"> 
            <div className="mr-2">
              <img src={bellicon} alt="Notifications" className="h-100 Bell-icon px-4" />
            </div>
            <img src={userPhoto} alt="User Profile" className="user-icon" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
