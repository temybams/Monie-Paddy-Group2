import { Link } from 'react-router-dom';
import userPhoto from "../../../../public/assets/Ellipse 134.svg";
import doticon from "../../../../public/assets/Ellipse 141.svg";
import bellicon from "../../../../public/assets/notification.png";
import { useState } from 'react';
import SuccessModal from '../modal/successPage';
import './Topbar.css';

function Topbar() {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
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
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>success</button>
              <img src={bellicon} alt="Notifications" className="h-100 Bell-icon px-4" />
            </div>
            <img src={userPhoto} alt="User Profile" className="user-icon" />
          </div>
          <SuccessModal
          show={showModal}
          handleClose={handleModalClose}
          title="Congratulations Gift🥳"
          message="Your account has been created . Sign in to view your dashboard"
          id="successModal"
        />
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
