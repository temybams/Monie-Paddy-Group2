import styled, { keyframes } from 'styled-components';

// Define the keyframe animation for the loader
const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Styled components for the loader
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite;
`;

// Loader component
const LoaderPage = () => {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};

export default LoaderPage;
