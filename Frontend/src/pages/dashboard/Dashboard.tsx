import Layout from "../../components/newLayout/Layout";
import Api from "../../api.config";
import { useEffect, useState } from "react";
import { OptionSide, TransactionSide, MoneyDetail } from "./Dashboard.style";
import Balance from "./Balance";
import Funding from "./FundMoney";
import CreatePin from "../../components/shared/modal/TransactionPin";
import SuccessModal from "../../components/shared/modal/successPage";
import Mastercard from "/mastercard.png";
import { CardDetails, UserDetails, Wrapper, Text } from "./CardDetails.style";
import FrequentTransfers from "./FrequentTransactions.style";
import Referrals from "./Referral.style";

function Dashboard() {
  const [userBalance, setUserBalance] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [popModal, setPopModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newFund, setNewFund] = useState(false);

  function fundSuccess() {
    setSuccessTitle(`Congratulations ${username}`);
    setSuccessMessage("You have successfully funded your wallet");
    setShowSuccess(true);
    setNewFund((prev) => !prev);
  }

  useEffect(() => {
    Api.get("/dashboard")
      .then((res) => {
        const { email, fullName } = res.data.data;
        setUsername(fullName);
        setUserEmail(email);
      })
      .catch((err) => {
        if (err.response) {
          const { message } = err.response.data;
          console.error(message);
        } else {
          console.error("No response from server");
        }
      });
  }, []);
  useEffect(() => {
    Api.get("/transactions/balance")
      .then((res) => {
        const { data } = res.data;
        setUserBalance(data);
      })
      .catch(() => {
        console.error("could not get balance");
      });
  }, [newFund]);

  return (
    <Layout>
       <CreatePin display={popModal} dismiss={() => setPopModal(false)} />
      <SuccessModal
        title={successTitle}
        show={showSuccess}
        message={successMessage}
        id="successModal"
        handleClose={() => setShowSuccess(false)}
      />
      <div className="row m-0 p-0" style={{ width: "100%", padding: "0" }}>
        <OptionSide className="col-12 col-lg-8 m-0 p-0">
          <MoneyDetail>
            <Balance balance={userBalance} />
            <div
              className="col-lg-6 col-12"
              style={{
                height: "186px",
                width: "312px",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={Mastercard}
                alt="credit card"
                className="mt-4 mx-4"
                style={{ width: "40px", height: "24px" }}
              />
              <UserDetails>GIFT Renee</UserDetails>
              <CardDetails>***6580</CardDetails>
            </div>
          </MoneyDetail>
          <div className="my-3" style={{ padding: "0 24px" }}>
            <Funding userEmail={userEmail} success={fundSuccess} />
          </div>
          <Wrapper>
            <Text>Quick Transfer</Text>
            <FrequentTransfers />
            <Text>Refer and earn 💰</Text>
            <Referrals />
          </Wrapper>
        </OptionSide>
        <TransactionSide className="col-12 col-lg-4"></TransactionSide>
      </div>
    </Layout>
  );
}

export default Dashboard;
