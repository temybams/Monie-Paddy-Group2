import { Link } from "react-router-dom";
import Topbar from "../../components/shared/topbar/Topbar";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import Card from "./Card";
import Phone from "./assets/Vector.png";
import Wallet from "./assets/wallet.png";
import Connection from "./assets/connection.png";
import Bolt from "./assets/Bolt.png";
// import "./payment.css"

export default function payment() {
  return (
    <div className="container-fluid">
      <Topbar />
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10 main">
          <div className="container p-5">
            <div className="row row-cols-3 g-5 fs-6">
              <div className="col">
                <Link to="/send-money" className="text-decoration-none">
                  <div className="bg-white mr-3 p-3 ">
                    <Card
                      header="Send Money"
                      image={Wallet}
                      message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias doloribus laborum eveniet eligendi."
                    />
                  </div>
                </Link>
              </div>
              <div className="col">
                <div className="bg-white mr-3 p-3">
                  <Link to="/airtime" className="text-decoration-none">
                    <Card
                      header="Buy Airtime"
                      image={Phone}
                      message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias doloribus laborum eveniet eligendi."
                    />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="bg-white mr-3 p-3">
                  <Link to="/send-money" className="text-decoration-none">
                    <Card
                      header="Buy Data"
                      image={Connection}
                      message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias doloribus laborum eveniet eligendi."
                    />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="bg-white mr-3 p-3">
                  <Link to="/send-money" className="text-decoration-none">
                    <Card
                      header="Buy Electricity"
                      image={Bolt}
                      message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias doloribus laborum eveniet eligendi."
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
