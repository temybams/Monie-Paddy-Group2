import styled from "styled-components";

export const Wrapper = styled.div`
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

export const Area = styled.div`
  position: absolute;
  top: 116px;
  left: 279px;
  background-color: #e3f1ff;
  width: 100%;
  height: 1001px;
`;

export const AccountDetailsForm = styled.div`
  position: absolute;
  top: 201px;
  left: 704px;
  width: 100%;
  height: 715px;
  color: #404040;
`;

export const FormContainer = styled.div`
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

export const AccountNumberInput = styled.input``;

export const SelectField = styled.select`
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
  ${(props) =>
    props.disabled &&
    `
      background-color: #ddd; 
      cursor: not-allowed;
     
    `}
`;


export const FormWrapper = styled.div<{ show: boolean }>`
  width: 88%;
  max-width: 600px;
  height: auto;
  padding: 32px 24px;
  margin: 0 auto;

  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  gap: 16px;
  background-color: #fff;
  border-radius: 8px;

  @media (min-width: 768px) {
    width: 600px;
    height: auto;
    padding: 40px 32px;
    gap: 24px;
  }
`;

export const Top = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const LogoWrap = styled.div`
  width: 72px;
  height: 72px;
  background-color: #e8f1fd;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

export const Logo = styled.img`
  width: 32px;
  height: 32px;
`;
export const TopMessage = styled.p`
  font-size: 16px;
  font-weight: 400px;
`;


export const AcctName = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;