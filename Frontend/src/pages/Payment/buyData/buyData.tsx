import React, { useState } from "react";
import Api from "../../../api.config";
import Topbar from "../../../components/shared/topbar/Topbar";
import Sidebar from "../../../components/shared/sidebar/Sidebar";
import SuccessModal from "../../../components/shared/modal/successPage";
import connection from "../assets/Connection.png";

const DataPurchase: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [network, setNetwork] = useState<string>("--Select Network--");
  const [dataPlan, setDataPlan] = useState<string>("--select dataplan--");
  const [transactionPin, setTransactionPin] = useState<string>("");
  const [purchaseResult, setPurchaseResult] = useState<any>(null);
  const [dataPlans, setDataPlans] = useState([]);

  // function handleChange(
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) {
  //   const { name, value } = e.target;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // }

  function handleSelectNetwork(e: any) {
    setNetwork(e.target.value);
    console.log(e.target.value);
    if (e.target.value) {
      // fetch dataplans for selected network
      Api.get(
        `http://localhost:5500/transactions/getDataPlans?network=${e.target.value}`
      )
        .then((response) => {
          const plans = response.data.data;
          plans.unshift(null);
          const plansList = plans.map((plan: dataPlanTypes, index: number) => {
            if (index === 0) {
              return (
                <option key={index} value="">
                  --Select Data Plan--
                </option>
              );
            }
            const planName = `${plan.meta.data_value}, ${plan.meta.data_expiry} at ${plan.meta.fee}${plan.meta.currency}`;

            return (
              <option key={plan.id} value={plan.id}>
                {planName}
              </option>
            );
          });
          setDataPlans(plansList);
        })
        .catch((error) => console.log(error));
    }
  }

  const buyData = async () => {
    console.log(phoneNumber, network, dataPlan, transactionPin);
    console.log(network);
    try {
      // API call using the configured Axios instance
      const response = await Api.post("/transactions/buyData", {
        phoneNumber,
        network,
        dataPlanId: dataPlan,
        transactionPin,
      });

      // Process the response
      const result = response.data;
      console.log(result);
      setPurchaseResult(result.message);
    } catch (error: any) {
      console.error("Data purchase failed:", error.message);
      setPurchaseResult({ message: "Data purchase failed. Please try again." });
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
                  name="phoneNumber"
                  required
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
                  onChange={handleSelectNetwork}
                >
                  <option value="">--Select Network--</option>
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
                  {dataPlans}
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
                  name="transactionPin"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={buyData}
              >
                Buy Data
              </button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
      <SuccessModal
        show={purchaseResult !== null}
        title={purchaseResult || ""}
        message={purchaseResult || ""}
        handleClose={() => setPurchaseResult(null)}
        id="successModal"
      />
    </div>
  );
};

export default DataPurchase;

interface dataPlanTypes {
  id: string;
  meta: {
    data_value: string;
    data_expiry: string;
    fee: string;
    currency: string;
  };
}
