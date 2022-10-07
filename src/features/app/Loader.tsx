import React from "react";
import { useDispatch, useSelector } from "../../app/hooks";
import styled, { keyframes } from "styled-components";
import { State } from "../../types/appSlice";

const Loader = () => {
  const loading = useSelector((state: State) => state.loading);

  return (
    <Container isLoading={loading}>
      <ProgressBar isLoading={loading} />
    </Container>
  );
};

export default Loader;

const progressAnimation = keyframes`
  0% {width: 10%}
  100% {width: 100%}
`;

const hideProgress = keyframes`
  0% {height: 100%}
  100% {height: 0%}
`;

const ProgressBar = styled.div`
  background: #00f260;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  border-radius: 15px;
  animation-name: ${(props) =>
    props.isLoading ? progressAnimation : hideProgress};
  animation-duration: ${(props) => (props.isLoading ? "2s" : "1s")};
  animation-timing-function: ease-in;
`;

const Container = styled.div`
  background: #282828;
  position: absolute;
  display: flex;
  width: 90%;
  height: 50px;
  margin: 20px;
  bottom: 0;
  z-index: 99;
  justify-content: space-around;
  border-radius: 15px;
  opacity: ${(props) => (props.isLoading ? 1 : 0)};
  transition: opacity 0.5s ease;
  box-shadow: 0px 1px 29px -6px rgba(0, 0, 0, 1);
  pointer-events: none;
`;
