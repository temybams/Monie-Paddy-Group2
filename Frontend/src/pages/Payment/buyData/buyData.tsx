import React, { useState } from "react";
import Api from "../../../api.config";
import Topbar from "../../../components/shared/topbar/Topbar";
import Sidebar from "../../../components/shared/sidebar/Sidebar";
import SuccessModal from "../../../components/shared/modal/successPage";
import connection from "../assets/Connection.png";

const DataPurchase: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [network, setNetwork] = useState<string>('MTN');
    const [dataPlan, setDataPlan] = useState<string>('1GB');
    const [transactionPin, setTransactionPin] = useState<string>('');
    const [purchaseResult, setPurchaseResult] = useState<any>(null);
  
    const buyData = async () => {
      try {
     // API call using the configured Axios instance
        const response = await Api.post("/payments/buyData", {
          amount,
          phoneNumber,
          network,
          dataPlan,
          transactionPin,
        });
  
        // Process the response
        const result = response.data;
        setPurchaseResult(result);
      } catch (error: any) {
        console.error('Data purchase failed:', error.message);
        setPurchaseResult({ message: 'Data purchase failed. Please try again.' });
      }
    };
  
    return (
      <div className="container-fluid">
        <Topbar />
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 d-flex main">
            <div className="col-md-3"></div>
            <div className="justify-content-center col-md-6">
              <form className="row align-items-center p-4 my-5 bg-white g-2">
                <div>
                  <div className="img">
                    <img src={connection} alt="phone-image" />
                  </div>
                  <p className="text-dark pt-3">Enter your details to buy data</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="text"
                    className="form-control p-3"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control p-3"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="network" className="form-label">
                    Network
                  </label>
                  <select
                    className="form-select p-3"
                    id="network"
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                  >
                    <option value="MTN">MTN</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Glo">Glo</option>
                    <option value="9mobile">9mobile</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="dataPlan" className="form-label">
                    Data Plan
                  </label>
                  <select
                    className="form-select p-3"
                    id="dataPlan"
                    value={dataPlan}
                    onChange={(e) => setDataPlan(e.target.value)}
                  >
                    <option value="1GB">1GB</option>
                    <option value="2GB">2GB</option>
                    <option value="5GB">5GB</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="transactionPin" className="form-label">
                    Transaction Pin
                  </label>
                  <input
                    type="password"
                    className="form-control p-3"
                    id="transactionPin"
                    placeholder="Enter transaction pin"
                    value={transactionPin}
                    onChange={(e) => setTransactionPin(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={buyData}>
                  Buy Data
                </button>
              </form>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        <SuccessModal
          show={purchaseResult !== null}
          title={purchaseResult?.message || ""}
          message={purchaseResult?.data || ""}
          handleClose={() => setPurchaseResult(null)}
          id="successModal"
        />
      </div>
    );
  };
  
  export default DataPurchase;