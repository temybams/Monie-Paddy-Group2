import styled from 'styled-components';
import { FC } from 'react';
import successImage1 from '../../../assets/sucessImage1.png';

interface SuccessModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  message: string;
  id: string;
}

const Modal = styled.div<{ show: boolean }>`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00AFB9;
  z-index: 9999;
`;

const ModalDialog = styled.div`
  // Add your styles here...
`;

const ModalContent = styled.div`
  // Add your styles here...
`;

const ModalImage1 = styled.img`
    max-width: 105px;
    height: 101px;
    margin-left: 71px;
    margin-top: 106px;
    position: fixed; 
    z-index: 9999; 
`
const ModalImage2 = styled.img`
    max-width: 140px;
    height: 136px;
    margin-left: 650px;
    margin-top: 135px;
    position: fixed; 
    z-index: 9999; 
`
const ModalImage3 = styled.img`
    max-width: 109px;
    height: 106px;
    margin-left: 1057.75px;
    margin-top: -12px;
    position: fixed; 
    z-index: 9999; 
`
const ModalImage4 = styled.img`
    max-width: 103px;
    height: 101px;
    margin-left: 1248px;
    margin-top: 198px;
    position: fixed; 
    z-index: 9999; 
`
const ModalImage5 = styled.img`
    max-width: 76px;
    height: 74px;
    margin-left: 212.5px;
    margin-top: 411.7px;
    position: fixed; 
    z-index: 9999; 
`
const ModalImage6 = styled.img`
    max-width: 76px;
    height: 74px;
    margin-left: 72.5px;
    margin-top: 662px;
    position: fixed; 
    z-index: 9999; 
`
const ModalImage7 = styled.img`
    max-width: 103px;
    height: 101px;
    margin-left: 338px;
    margin-top: 856px;
    position: fixed; 
    z-index: 9999; 
`
const ModalImage8 = styled.img`
    max-width: 49.5px;
    height: 48.3px;
    margin-left: 664px;
    margin-top: 832.4px;
    position: fixed; 
    z-index: 9999; 
`
const ModalImage9 = styled.img`
    max-width: 49.5px;
    height: 48.3px;
    margin-left: 664px;
    margin-top: 630.4px;
    position: fixed; 
    z-index: 9999; 
`
const ModalImage10 = styled.img`
    max-width: 164px;
    height: 160px;
    margin-left: 1052px;
    margin-top: 550px;
    position: fixed; 
    z-index: 9999; 
`
const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const ModalTitle = styled.h1`
  color: #FFF;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -1.04px;
`;

const ModalButton = styled.button`
  background-color: #ffffff;
  color: #00AFB9;
  width: 232px;
  // height: 64px;
  // width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SuccessModal: FC<SuccessModalProps> = ({ show, handleClose, title, message, id }) => {
  return (
    <Modal show={show} tabIndex={-1} id={String(id)}>
      <ModalDialog>
        <ModalContent>
          <ModalImage1 src={successImage1} alt="Success Image" />
          <ModalImage2 src={successImage1} alt="Success Image" />
          <ModalImage3 src={successImage1} alt="Success Image" />
          <ModalImage4 src={successImage1} alt="Success Image" />
          <ModalImage5 src={successImage1} alt="Success Image" />
          <ModalImage6 src={successImage1} alt="Success Image" />
          <ModalImage7 src={successImage1} alt="Success Image" />
          <ModalImage8 src={successImage1} alt="Success Image" />
          <ModalImage9 src={successImage1} alt="Success Image" />
          <ModalImage10 src={successImage1} alt="Success Image" />

          <ModalBody>
            <ModalTitle>{title}</ModalTitle>
            <p>{message}</p>
            <ModalButton onClick={handleClose}>
              Continue
            </ModalButton>
          </ModalBody>
        </ModalContent>
      </ModalDialog>
    </Modal>
  );
};

export default SuccessModal;