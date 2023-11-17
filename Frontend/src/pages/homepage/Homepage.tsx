import styled from "styled-components";
import landingImage from "/model.png";
import { useNavigate } from "react-router-dom";

const Navbar = styled.div`
  width: 100%;
  height: 68px;
  padding: 12px 16px;
  background-color: #fff;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000; /* Ensure it appears above other content */
`;

const Logo = styled.h2`
  font-family: "Holtwood One SC", cursive;
  color: var(--Pri-Color);
  font-size: 1.5rem;
  font-weight: 400;
  margin-left: 125px;
`;

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Updated suggestion 2 */
  background: radial-gradient(circle, #fff 0%, var(--Pri-Sec) 100%);
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%; /* Adjust the width as needed */
  max-width: 1200px; /* Set a maximum width */

  @media (max-width: 600px){
    display: flex;
    flex-direction: column; /* Change to column for smaller screens */
    align-items: center;
    width: 100%;
    padding: 0 10px; /* Adjust as needed */
  }
`;

const TextContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-family: "Inter";
  font-weight: 600;
  color: black;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #3165a6b0;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const RoundedImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: 20px 20px 20px 20px;
  border: 2px solid var(--Pri-Color);
  /* Updated suggestion 1: Move the inline styles here */
  width: 100%;
  height: auto;
  max-width: 600px;
`;

const Button = styled.button`
  padding: 0.625em 1.25em; /* Updated suggestion 3 */
  font-size: 1rem;
  background-color: var(--Pri-Color);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  margin-left: 5%; /* Adjust the margin as needed for better positioning */
  overflow: hidden; /* Ensure rounded corners are visible */
  position: relative;
  @media (max-width: 600px){
    margin-top: 20px;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };
  return (
    <>
      <Navbar>
        <Logo>MONIEPADDIE</Logo>
      </Navbar>
      <LandingPageContainer>
        <ContentContainer>
          <TextContainer>
            <Title>SWIFT PAYMENT</Title>
            <Description>
              Experience unparalleled freedom with MoniePaddie where payments
              become seamless, transfers are quick,and you can recharge airtime
              & data top-ups. Benefit from our 100% network uptime, ensuring
              swift and reliable transactions, allowing you to make payments in
              seconds without the risk of transaction failures. Choose
              MoniePaddie for a better life.
            </Description>
            <Button onClick={handleButtonClick}>Get Started</Button>
          </TextContainer>
          <ImageContainer>
            <RoundedImage
              src={landingImage}
              alt="Landing"
            />
          </ImageContainer>
        </ContentContainer>
      </LandingPageContainer>
    </>
  );
};

export default LandingPage;
