import styled from "styled-components";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import Topbar from "../../components/shared/topbar/Topbar";
import { FormEvent } from "react";

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 1117px;
  overflow: hidden;
  text-align: left;
  font-size: 16px;
  color: #00afb9;
  font-family: Inter;
`;

const Area = styled.div`
  position: absolute;
  top: 116px;
  left: 279px;
  background-color: #e3f1ff;
  width: 100%;
  height: 1001px;
`;

const AccountDetailsForm = styled.div`
  position: absolute;
  top: 201px;
  left: 704px;
  width: 100%;
  height: 715px;
  color: #404040;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #fff;
  width: 600px;
  height: 715px;
  padding: 20px;
  margin-left: -15%;
`;

export const InputHead = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
`;
export const Label = styled.label`
  color: #000;
`;

export const InputField = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    outline: none;
    border: 2px solid var(--Pri-Color);
  }

  @media (min-width: 768px) {
    padding: 16px 12px;
  }
`;

const FormHeader = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  width: 260px;
  height: 107px;
  color: #000;
`;

const GroupIcon = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 72px;
  height: 72px;
`;

const EnterYourDetails = styled.div`
display: flex;
align-items: center;
position: relative;
top: 88px;
left: 0px;
`;

export const SubmitForm = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: var(--Pri-Color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  padding: 16px 12px;
  border: none;
  cursor: pointer;
  margin: 20px 0;

  &:hover {
    opacity: 0.8;
  }
`;

function SendMoneyII() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("submitting form");
  }
  return (
    <Wrapper>
      <Topbar />
      <Sidebar />
      <Area />
      <AccountDetailsForm>
        <FormContainer>
      <FormHeader>
            <GroupIcon alt="" src="/group-15868.svg" />
            <EnterYourDetails>
              Enter your details to send money
            </EnterYourDetails>
          </FormHeader>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="bankNote">Note (optional)</Label>
              </InputHead>
            </div>
              <InputField
                id="bankNote"
                placeholder="Enter a transaction note"
                type="text"
              />
            <div className="my-3">
              <InputHead>
                <Label htmlFor="amount">Amount</Label>
              </InputHead>
              <InputField
                id="amount"
                placeholder="Enter an amount"
                type="number"
                inputMode="none"
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="pin">Pin</Label>
              </InputHead>
              <InputField
                id="pin"
                placeholder="Enter your transaction pin"
                type="number"
                required
              />
            </div>
            <div className="mt-5">
              <SubmitForm type="submit">Send Money</SubmitForm>
            </div>
          </form>

        </FormContainer>
        {/* //form with fields for bank name, account number, account name, and submit button */}
      </AccountDetailsForm>
    </Wrapper>
  );
}

export default SendMoneyII;
