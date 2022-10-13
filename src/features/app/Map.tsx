import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector, useDispatch } from "../../app/hooks";
import Mapbox, {
  useMap,
  Source,
  Layer,
  LayerProps,
  Marker,
} from "react-map-gl";
import jsonToGeoJson from "../../utilities/jsonToGeoJson";
import styled from "styled-components";
import type { GeoJSONSource } from "react-map-gl";
import {
  clusterCountLayer,
  clusterLayer,
  stationLayer,
} from "../../utilities/layers";
import { setCurrentStation, setLoading } from "./appSlice";
import { State } from "../../types/appSlice";
import { MapPin } from "phosphor-react";

// Api key
import token from "../../mapboxToken";
const ACCESS_TOKEN = token;

const Map = () => {
  const dispatch = useDispatch();
  const { map } = useMap();
  const { list: stations } = useSelector((state: State) => state.stations);
  const userCoords = useSelector((state: State) => state.userCoords);
  const appViewState = useSelector((state: State) => state.appViewState);
  const loading = useSelector((state: State) => state.loading);
  const [viewState, setViewState] = useState({});

  const geojson = jsonToGeoJson(stations);

  const onClick = (event) => {
    // Map click
    if (event.features.length < 1) {
      return;
    }
    const feature = event.features[0];
    // Cluster Click
    if (feature.properties.cluster) {
      const clusterId = feature.properties.cluster_id;
      const mapboxSource = map.getSource("stations") as GeoJSONSource;

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }

        map.easeTo({
          center: feature.geometry.coordinates,
          zoom: zoom + 2,
          duration: 500,
        });
      });
      return;
    }
    console.log(feature.geometry.coordinates);
    // Marker Click
    map.easeTo({
      center: feature.geometry.coordinates,
      zoom: 13,
      duration: 500,
    });
    dispatch(setCurrentStation(feature.properties.id));
  };

  useEffect(() => {
    setViewState({ ...userCoords, zoom: 12 });
  }, [userCoords]);

  useEffect(() => {
    setViewState(appViewState);
  }, [appViewState]);

  return (
    <>
      <Container isLoading={loading}></Container>
      <Mapbox
        id="map"
        {...viewState}
        mapboxAccessToken={ACCESS_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        initialViewState={{
          zoom: 14,
        }}
        onLoad={() => dispatch(setLoading(false))}
        onClick={onClick}
        interactiveLayerIds={[clusterLayer.id, stationLayer.id]}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/sundvall/ckjruifed4r7519qg3i53l58s"
      >
        <Source
          id="stations"
          type="geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={12}
          clusterRadius={50}
        >
          <Layer {...stationLayer} />
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          {userCoords.latitude && (
            <Marker
              longitude={userCoords.longitude}
              latitude={userCoords.latitude}
            >
              <MapPin size={25} color="#069fdb" weight="fill" />
            </Marker>
          )}
        </Source>
      </Mapbox>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  border-radius: 20px;
  z-index: 10;
  background-color: #1d1d1d;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: all 0.35s;
  opacity: ${(props) => (props.isLoading ? 1 : 0)} !important;
`;

export default Map;
