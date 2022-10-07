import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "../../app/hooks";
import { getData, getUserCoords } from "./appSlice";
import Navbar from "./Navbar";
import Map from "./Map";
import { MapProvider } from "react-map-gl";
import StationList from "./StationList";
import StationInfo from "./StationInfo";
import Loader from "./Loader";
import { AnimatePresence } from "framer-motion";
import PhoneCutout from "../../components/PhoneCutout";
import { State } from "../../types/appSlice";
import Popup from "./Popup";

const App = (props) => {
  const dispatch = useDispatch();
  const { currentStation, list } = useSelector(
    (state: State) => state.stations
  );
  const loading = useSelector((state: State) => state.loading);
  const showPopup = useSelector((state: State) => state.showPopup);

  useEffect(() => {
    // dispatch(getUserCoords());
    dispatch(getData());
  }, []);

  const renderApp = () => {
    if (list < 1) {
      return null;
    } else {
      return (
        <MapProvider>
          <Container>
            <PhoneCutout />
            <AnimatePresence>
              {!loading && showPopup && <Popup />}
            </AnimatePresence>
            <Map />
            <Loader />
            <StationList />
            <Navbar />
            <AnimatePresence>
              {currentStation && (
                <StationInfo
                  freeBikes={currentStation.available_vehicles}
                  freeSpots={currentStation.available_slots}
                  name={currentStation.name}
                />
              )}
            </AnimatePresence>
          </Container>
        </MapProvider>
      );
    }
  };

  return <AppWrapper>{renderApp()}</AppWrapper>;
};

export default App;

const AppWrapper = styled.div`
  background-color: #000;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  position: absolute;
  width: 390px;
  height: 844px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
