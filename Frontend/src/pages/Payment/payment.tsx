import { Link } from "react-router-dom";
import Topbar from "../../components/shared/topbar/Topbar";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import Card from "./Card";
import Phone from "../Payment/Airtime/Vector.png"
import "./payment.css"


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
            <div className="row row-cols-3 g-5">
                <div className="col p-3">
                <Link to="/send-money">
                    <Card header="Send Money" image={Phone} message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias doloribus laborum eveniet eligendi."/>
                </Link>
                </div>
                <div className="col p-3">
                <Link to="/airtime">
                    <Card header="Buy Airtime" image={Phone} message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias doloribus laborum eveniet eligendi."/>
                </Link>
                </div>
                <div className="col p-3">
                <Link to="/send-money">
                    <Card header="Send Money" image={Phone} message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias doloribus laborum eveniet eligendi."/>
                </Link>
                </div>
                <div className="col p-3">
                <Link to="/send-money">
                    <Card header="Send Money" image={Phone} message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestias doloribus laborum eveniet eligendi."/>
                </Link>
                </div>
                
            </div>
        </div>
    </div>
    </div>
   </div>
  )
}
