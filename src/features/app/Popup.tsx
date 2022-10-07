import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "../../app/hooks";
import { State } from "../../types/appSlice";
import { setShowPopup, getUserCoords } from "./appSlice";

const popup = {
  hidden: { opacity: 0, y: "-100px", x: "-50%" },
  show: {
    opacity: 1,
    y: "0",
    x: "-50%",
    transition: {
      delay: 0.45,
    },
  },
  hide: {
    opacity: 0,
    y: "-100px",
    x: "-50%",
  },
};

const Popup: React.FC = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(getUserCoords());
    dispatch(setShowPopup(false));
  };
  return (
    <>
      <PopupHider />

      <Container
        initial="hidden"
        animate="show"
        exit="hide"
        as={motion.div}
        variants={popup}
      >
        <Title>Use Geolocation?</Title>
        <Buttons>
          <Button onClick={onClick} color={"#00a743"}>
            Yes
          </Button>
          <Button onClick={() => dispatch(setShowPopup(false))}>No</Button>
        </Buttons>
      </Container>
    </>
  );
};

const PopupHider = styled.div`
  width: 60%;
  position: absolute;
  height: 150px;
  z-index: 98;
  background: #000;
  top: -160px;
  left: 50%;
  transform: translateX(-50%);
`;

const Container = styled.div`
  width: 60%;
  z-index: 97;
  background: #282828;
  border-radius: 15px;
  box-shadow: 0px 1px 29px -6px rgba(0, 0, 0, 1);
  top: 50px;
  position: absolute;
  left: 50%;
  height: 100px;
`;

const Title = styled.h2`
  padding: 5px;
  font-size: 100%;
  color: white;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  margin: 0 auto;
  padding: 0 40px;
`;

const Button = styled.button`
  background: ${(props) => (props.color ? props.color : "#5e5e5e")};
  color: white;
  padding: 7.5px 10px;

  width: 60px;
  border: none;
  border-radius: 30px;
`;

export default Popup;

// Use Geolocation?
