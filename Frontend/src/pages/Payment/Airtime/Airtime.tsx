import { useState } from "react";
import Api from "../../../api.config";
import Topbar from "../../../components/shared/topbar/Topbar";
import Sidebar from "../../../components/shared/sidebar/Sidebar";
import "./Airtime.css";
import phone from "../assets/Vector.png";

export default function Airtime() {
  const [formData, setFormData] = useState({
    network: "",
    amount: "",
    phoneNumber: "",
    transactionPin: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(formData);

    Api.post("/transactions/airtime", formData, {})
      .then((res) => {
        const { message } = res.data;
        console.log(message);
        setFormData({
          network: "",
          amount: "",
          phoneNumber: "",
          transactionPin: "",
        });
      })
      .catch((err) => {
        if (err.response) {
          const errorCode = err.response.status;
          console.error(`Problem occured received status: ${errorCode}`);
        } else {
          console.error("Did not receive response");
        }
        console.log("Airtime purchase failed:", err.response.data.message);
      });
  };

  return (
    <div className="container-fluid">
      <Topbar />

      <div className="row ">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10 d-flex main">
          <div className="col-md-3"></div>

          <div className="justify-content-center col-md-6  ">
            <form
              className="row align-items-center p-4 my-5 bg-white g-2"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="img">
                  <img src={phone} alt="phone-image" />
                </div>
                <p className="text-dark pt-3">
                  Enter your details to buy airtime
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="network" className="form-label">
                  Network
                </label>
                <select
                  className="form-select p-3"
                  aria-label="Default select example"
                  id="network"
                  name="network"
                  value={formData.network}
                  onChange={handleChange}
                >
                  <option value="">Select network</option>

                  <option value="1">Mtn</option>
                  <option value="2">Airtel</option>
                  <option value="3">Glo</option>
                  <option value="4">9mobile</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control p-3"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  aria-describedby="phoneNumber"
                  placeholder="08012345678"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control p-3"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  aria-describedby="amount"
                  placeholder="1000"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="transactionPin" className="form-label">
                  Pin
                </label>
                <input
                  type="password"
                  className="form-control p-3"
                  id="transactionPin"
                  name="transactionPin"
                  value={formData.transactionPin}
                  onChange={handleChange}
                  aria-describedby="transactionPin"
                  placeholder="Enter your transaction pin"
                />
              </div>

              <button type="submit" className="btn p-3">
                Proceed
              </button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}
