import React, { useEffect, useRef } from "react";
import "./styles/StationList.css";
import { useSelector, useDispatch } from "../../app/hooks";
import StationListItem from "./StationListItem";
import styled from "styled-components";
import coordsToMeters from "../../utilities/coordsToMeters";
import { State } from "../../types/appSlice";
const StationList = () => {
  const dispatch = useDispatch();
  const { latitude: userLat, longitude: userLng } = useSelector(
    (state: State) => state.userCoords
  );
  const stations = useSelector((state: State) => state.stations.list);
  const activeSection = useSelector((state: State) => state.activeSection);
  const open = activeSection === "StationList";
  const withDistanceProp = stations.map((station) => ({
    ...station,
    distanceToStation: coordsToMeters(
      userLat,
      userLng,
      station.latitude,
      station.longitude
    ),
  }));

  const sortedStations = withDistanceProp.sort(
    (a, b) => a.distanceToStation > b.distanceToStation
  );
  // useEffect(() => {
  //   const handleClick = (e) => {
  //     if (listRef.current && listRef.current.contains(e.target)) {
  //       return;
  //     }
  //     dispatch(updateActiveComponent("Map"));
  //   };
  //   document.addEventListener("click", handleClick, {
  //     capture: true,
  //   });
  // }, []);

  // useEffect(() => {
  //   // Slides list back and forth
  //   if (activeSection === "StationList" && ref?.current) {
  //     document.querySelector(".list-container").style = `left: 0;`;
  //   } else {
  //     document.querySelector(".list-container").style = `left: -100vw;`;
  //   }
  // }, [activeSection]);

  // If user clicks outside list when it's open, it closes

  const renderedStations = sortedStations.map((station) => {
    return (
      <StationListItem
        distanceToStation={station.distanceToStation}
        key={station.id}
        station={station}
      />
    );
  });

  return (
    <>
      <ListHider />
      <Container open={open}>
        <ListFader />
        <ScrollBoxSpacer />
        <ScrollBox>{renderedStations}</ScrollBox>
      </Container>
    </>
  );
};

export default StationList;

const ListFader = styled.div`
  position: absolute;
  width: 65%;
  height: 200px;
  bottom: 0;
  background-color: #282828;
  background: linear-gradient(
    7deg,
    rgba(40, 40, 40, 1) 40%,
    rgba(119, 119, 119, 0) 100%
  );

  z-index: 9;
  pointer-events: none;
`;

const ListHider = styled.div`
  position: absolute;
  width: 100%;
  height: 110%;
  top: 0;
  background-color: #000;
  transform: translateX(-100%);
  z-index: 99;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  z-index: 8;
  height: 100%;
  width: 100%;
  transform: ${(props) =>
    !props.open ? "translateX(-100%)" : "translateX(0)"};
  opacity: ${(props) => (!props.open ? 0 : 1)};
  transition: all 0.25s ease-in-out;
`;

const ScrollBoxSpacer = styled.div`
  background: #282828;
  width: 65%;
  height: 50px;
`;

const ScrollBox = styled.div`
  background: #282828;
  width: 65%;
  overflow-y: scroll;
  max-height: 96%;
  position: absolute;
  z-index: 2;
  top: 35px;
  box-shadow: 0px 1px 29px -6px rgba(0, 0, 0, 1);
  clip-path: inset(0px -15px 0px 0px);
`;
