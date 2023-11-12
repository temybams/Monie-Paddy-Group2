import {
  InputHead,
  InputField,
  Label,
  SubmitForm,
  FormWrapper,
  Top,
  LogoWrap,
  Logo,
  TopMessage,
  AcctName,
} from "./sendMoneyStyle";
import Layout from "../../../components/newLayout/Layout";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Select, { SingleValue } from "react-select";
import axios from "axios";
import Api from "../../../api.config";
import Wallet from "/Wallet.png";
import Funding from "../../dashboard/FundMoney";

interface BankEntry {
  active: boolean;
  code: string;
  country: string;
  currency: string;
  gateway?: string;
  id: number;
  is_deleted: boolean;
  longcode?: string;
  name: string;
  pay_with_bank: boolean;
  slug: string;
  type: string;
}

interface BankData {
  label: string;
  value: string;
  code: string;
  currency: string;
  type: string;
}

const secret = import.meta.env.VITE_APP_PAYSTACK_SECRET;

function SendMoney() {
  const [step, setStep] = useState(1);
  const [bankList, setBankList] = useState<BankData[]>([]);
  const [account_number, setAcctNum] = useState("");
  const [selectedBank, selectBank] = useState<BankData>({
    value: "",
    label: "Select a bank",
    code: "",
    currency: "",
    type: "",
  });
  const [accountHolder, setAcctHolder] = useState("");
  const [feedback1, setFeedback1] = useState("");
  const [submit1, setSubmit1] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, writeNote] = useState("");
  const [pin, setPin] = useState("");

  function handleSelectBank(newValue: SingleValue<BankData>) {
    if (newValue) selectBank(newValue);
  }

  function enterAccountNumber(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setAcctNum(value);
    }
  }
  function enterPin(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
    }
  }

  function submitForm1(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedBank.value && !submit1) {
      setSubmit1(true);
      const Authorization = `Bearer ${secret}`;
      const postData = {
        account_number,
        bank_code: selectedBank.code,
        currency: selectedBank.currency,
        type: selectedBank.type,
      };
      axios
        .post("https://api.paystack.co/transferrecipient", postData, {
          headers: {
            Authorization,
          },
        })
        .then((res) => {
          const { account_name } = res.data.data.details;
          setAcctHolder(account_name);
          setStep(2);
          setSubmit1(false);
        })
        .catch(() => {
          setFeedback1("Could not resolve bank account");
          setSubmit1(false);
          setTimeout(() => {
            setFeedback1("");
          }, 1500);
        });
    }
  }

  function submitForm2(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!submit1) {
      setSubmit1(true);
      const transferDetails = {
        bankName: selectedBank.label,
        accountName: accountHolder,
        accountNumber: account_number,
        amount: Number(amount) * 100,
        note,
        pin,
      };
      Api.post("/transactions/sendMoney", transferDetails)
        .then(() => {
          selectBank({
            value: "",
            label: "Select a bank",
            code: "",
            currency: "",
            type: "",
          });
          setPin("");
          setAmount("");
          setAcctNum("");
          setAcctHolder("");
          writeNote("");
          setStep(1);
          setSubmit1(false);
        })
        .catch((err) => {
          if (err.response) {
            // console.log(err.response.data);
            const errCode = err.response.status;
            if (errCode === 409) {
              setFeedback1("Insufficient funds");
              setTimeout(() => {
                setFeedback1("");
              }, 1500);
            } else if (errCode === 403) {
              setFeedback1("Invalid transaction pin");
              setTimeout(() => {
                setFeedback1("");
              }, 1500);
            } else {
              setFeedback1("Transaction failed");
              setTimeout(() => {
                setFeedback1("");
              }, 1500);
            }
            selectBank({
              value: "",
              label: "Select a bank",
              code: "",
              currency: "",
              type: "",
            });
            setPin("");
            setAmount("");
            setAcctNum("");
            setAcctHolder("");
            writeNote("");
            setStep(1);
            setSubmit1(false);
          }
        });
    }
  }
  useEffect(() => {
    const fresh: BankData[] = [];
    axios.get("https://api.paystack.co/bank").then((res) => {
      res.data.data.forEach((bank: BankEntry) => {
        fresh.push({
          code: bank.code,
          currency: bank.currency,
          type: bank.type,
          label: bank.name,
          value: bank.code,
        });
      });
      setBankList(fresh);
      //   console.log(res.data.data[120]);
    });
  }, []);
  return (
    <Layout activeNav="payment">
      <div style={{ padding: "40px 0" }}>
        <FormWrapper show={step === 1}>
          <Top>
            <LogoWrap>
              <Logo src={Wallet} alt="load img" />
            </LogoWrap>
            <TopMessage>Enter your details to send money</TopMessage>
          </Top>
          <form onSubmit={submitForm1}>
            <Select
              options={bankList}
              isSearchable
              placeholder="Select or type to search"
              required
              value={selectedBank}
              onChange={handleSelectBank}
              styles={{
                control: (base) => ({
                  ...base,
                  fontSize: "16px",
                  padding: "8px",
                }),
              }}
            />
            <div className="my-3">
              <InputHead>
                <Label htmlFor="account_number">Account Number</Label>
              </InputHead>
              <InputField
                placeholder="0122319063"
                id="account_number"
                required
                maxLength={10}
                minLength={10}
                value={account_number}
                onChange={enterAccountNumber}
              />
            </div>
            <br />
            <SubmitForm>{submit1 ? "Processing..." : "Proceed"}</SubmitForm>
          </form>

          <p style={{ color: "red" }}>{feedback1}</p>
        </FormWrapper>
        <FormWrapper show={step === 2}>
          <Top>
            <LogoWrap>
              <Logo src={Wallet} alt="load img" />
            </LogoWrap>
            <TopMessage>Complete transfer to:</TopMessage>
          </Top>
          <AcctName>{accountHolder}</AcctName>
          <form onSubmit={submitForm2}>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="note">Note(optional)</Label>
              </InputHead>
              <InputField
                placeholder="Enter a transaction note"
                type="text"
                maxLength={50}
                value={note}
                onChange={(e) => writeNote(e.target.value)}
                id="note"
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="amount">Amount</Label>
              </InputHead>
              <InputField
                placeholder="Amount"
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="pin">Pin</Label>
              </InputHead>
              <InputField
                placeholder="Enter transaction pin"
                type="password"
                minLength={4}
                maxLength={4}
                value={pin}
                onChange={enterPin}
                required
              />
            </div>
            <br />
            <SubmitForm>{submit1 ? "Processing..." : "Pay"}</SubmitForm>
          </form>
          <p style={{ color: "red" }}>{feedback1}</p>
        </FormWrapper>
        <div className="container-fluid">
          <Funding
            userEmail="test@gmail.com"
            success={() => console.log("success")}
          />
        </div>
      </div>
    </Layout>
  );
}

export default SendMoney;
