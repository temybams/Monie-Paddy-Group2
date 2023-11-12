import styled from "styled-components";
import Sidebar from "../../../components/shared/sidebar/Sidebar";
import Topbar from "../../../components/shared/topbar/Topbar";

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

const AccountNumberInput = styled.input``;

const SelectField = styled.select`
  width: 100%;
  padding: 16px 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

function SendMoney() {
  return (
    <Wrapper>
      <Topbar />
      <Sidebar />
      <Area />
      <AccountDetailsForm>
        <FormContainer>
          <form>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="bankName">Bank Name</Label>
              </InputHead>
              <SelectField id="bankName" required>
                <option value="">Select a Bank</option>
                <option value="bank1">Access Bank</option>
                <option value="bank2">Sterling Bank</option>
                <option value="bank3">First Bank</option>
              </SelectField>
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="accountNumber">Account Number</Label>
              </InputHead>
              <InputField
                id="accountNumber"
                placeholder="Account Number"
                type="number"
                inputMode="none"
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="accountName">Account Name</Label>
              </InputHead>
              <InputField
                id="accountName"
                placeholder="Account Name"
                type="text"
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

export default SendMoney;
