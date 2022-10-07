import React from "react";
import { useDispatch } from "../../app/hooks";
import meterToKm from "../../utilities/unitConverter";
import { setActiveSection, setCurrentStation } from "./appSlice";
import { useMap } from "react-map-gl";
import styled from "styled-components";

const StationListItem = (props) => {
  const dispatch = useDispatch();
  const { map } = useMap();
  const {
    id,
    name,
    available_vehicles,
    latitude,
    longitude,
    distanceToStation,
  } = props.station;

  // handling StationInfo when station clicked
  const onClickStation = (station) => {
    dispatch(setCurrentStation(station.id));
    dispatch(setActiveSection("Map"));
    map.easeTo({
      center: [longitude, latitude],
      zoom: 13,
    });
  };
  // JSX blob
  return (
    <Item onClick={() => onClickStation(props.station)} key={"station" + id}>
      <AvailableBikes available={available_vehicles > 0}>
        {available_vehicles}
      </AvailableBikes>
      <div className="info">
        <h3>{name}</h3>
        <p>{meterToKm(distanceToStation)}</p>
      </div>
    </Item>
  );
};

const AvailableBikes = styled.h1`
  margin: 0;
  font-weight: 200;
  text-align: center;
  min-width: 50px;
  color: ${(props) => (props.available ? "#00f260" : "grey")};
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  color: white;
  padding: 10px;
  padding-left: 0;

  .info {
    width: 100%;
    h3 {
      margin: 0;
      width: 190px;
      font-weight: 400;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    p {
      margin: 0;
      color: grey;
    }
  }

  * {
  }
`;

export default StationListItem;
