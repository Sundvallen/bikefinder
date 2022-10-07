import React from "react";
import styled from "styled-components";

const PhoneCutout = () => {
  return (
    <Container>
      <img src="./phone-cutout.png" width="610px" />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 999;
  top: 52%;
  left: 49%;
  transform: translate(-50%, -50%);
`;

export default PhoneCutout;
