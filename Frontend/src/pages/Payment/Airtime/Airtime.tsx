import { useState } from "react";
import Api from "../../../api.config";
import Topbar from "../../../components/shared/topbar/Topbar";
import Sidebar from "../../../components/shared/sidebar/Sidebar";
import "./Airtime.css";
import phone from "../assets/Vector.png";
import SuccessModal from "../../../components/shared/modal/successPage";

export default function Airtime() {
  const [formData, setFormData] = useState({
    network: "",
    amount: "",
    phoneNumber: "",
    transactionPin: "",
  });
  const [success, setSuccess] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  

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
        setSuccessTitle("Your airtime purchase was succesful");
          setSuccessMsg(`Your airtime purchase of N${formData.amount} has been sent to ${formData.phoneNumber}`);
          setSuccess(true);
      })
      .catch((err) => {
        if (err.response) {
          const errorCode = err.response.status;
          console.error(`Problem occured received status: ${errorCode}`);
          setError(`Airtime purchase failed: ${err.response.data.message}`);
        } else {
          console.error("Did not receive response");
          setError("Airtime purchase failed: Unable to connect to the server");
        }
        console.log("Airtime purchase failed:", err);
      });
  };

  return (
    <div className="container-fluid">
      <SuccessModal
        show={success}
        title={successTitle}
        message={successMsg}
        handleClose={() => setSuccess(false)}
        id="successModal"
      />
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

                  <option value="mtn">Mtn</option>
                  <option value="airtel">Airtel</option>
                  <option value="glo">Glo</option>
                  <option value="9mobile">9mobile</option>
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
              {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
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
