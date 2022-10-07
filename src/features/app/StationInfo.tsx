import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../../app/hooks";
import { X } from "phosphor-react";
import styled, { keyframes } from "styled-components";
import { setCurrentStation } from "./appSlice";
import { Station } from "../../types/shared";
import { motion } from "framer-motion";

const StationInfo = ({
  name,
  freeBikes,
  freeSpots,
}: {
  name: string;
  freeBikes: number;
  freeSpots: number;
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <FloatContainer
        as={motion.div}
        initial={{ opacity: 0, y: "100px", x: "-50%" }}
        animate={{ opacity: 1, y: "0", x: "-50%" }}
        exit={{ opacity: 0, y: "100px", x: "-50%" }}
      >
        <Card>
          <CloseButton
            onClick={() => {
              dispatch(setCurrentStation(undefined));
            }}
          >
            <X size={20} weight="bold" />
          </CloseButton>
          <h2>{name}</h2>
          <InfoFlex isAvailable={freeBikes > 0}>
            <div>{freeBikes}</div>
            <p>{freeBikes !== 1 ? "Ledige Sykler" : "Ledig Sykkel"}</p>
          </InfoFlex>
          <InfoFlex isAvailable={freeSpots > 0}>
            <div>{freeSpots}</div>
            <p>{freeSpots !== 1 ? "Ledige Parkeringer" : "Ledig Parkering"}</p>
          </InfoFlex>
        </Card>
      </FloatContainer>
    </>
  );
};

export default StationInfo;

const FloatContainer = styled.div`
  background: #282828;
  position: absolute;
  min-height: 150px;
  border-radius: 10px;
  width: 80%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 1px 29px -6px rgba(0, 0, 0, 1);
  margin-bottom: 100px;
`;

const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  margin: 10px;
  right: 0;
  top: 0;
`;

const InfoFlex = styled.div`
  width: 100%;
  display: flex;
  margin: 10px;
  font-size: 105%;
  div {
    width: 20px;
    color: ${(props) => (props.isAvailable ? "#00f260" : "grey")};
  }
  p {
    margin: 0;
  }
`;

const Card = styled.div`
  color: white;
  margin: 10px;
  padding-bottom: 5px;
  h2 {
    font-weight: 300;
  }
`;
