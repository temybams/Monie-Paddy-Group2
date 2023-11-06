
import { Link } from 'react-router-dom';
import settingicon from "../../../../public/assets/settings.png";
import layersicon from "../../../../public/assets/layers.svg";
import bankicon from "../../../../public/assets/Bank.svg";
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="list-unstyled">
        <li className=" my-2 mt-3 py-2 ms-5">
          <Link to="/home" className=" sidebar-item d-flex align-items-center">
            <img src={bankicon} alt="Home" className="mr-2 px-3" />
            Home
          </Link>
        </li>
        <li className="my-3 py-3 ms-5">
          <Link to="/payments" className=" sidebar-item d-flex align-items-center">
            <img src={layersicon} alt="Payments" className="mr-5 px-3" />
            Payments
          </Link>
        </li>
        <li className="my-3 my-3 py-3 ms-5">
          <Link to="/settings" className=" sidebar-item d-flex align-items-center">
            <img src={settingicon} alt="Settings" className="mr-2 px-3" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
