import Topbar from '../topbar/Topbar'; 
import Sidebar from '../sidebar/Sidebar'; 
import './Layout.css'; 
import Transactions from '../transactions/Transactions';

function Layout() {
  return (
    <div className="container-fluid main-layout">
      <Topbar />
      <div className="row">
        <div className="col-lg-2">
          <Sidebar />
        </div>
        <div className="col-lg-10 main-page px-4 d-flex">
          <div className="transactions-bar">
            <div
              className=" transaction-col text-white "
              style={{
                width: '464px',
                height: '1001px',
                flexDirection: 'column',
              
              }}
            >
              <Transactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
