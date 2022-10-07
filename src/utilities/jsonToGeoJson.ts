import { Station } from "../types/shared";
import { FeatureCollection } from "geojson";

const jsonToGeoJson = (json: Station[]): FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: json.map((station: Station) => {
      return {
        type: "Feature",
        properties: {
          id: station.id,
          name: station.name,
          capacity: station.capacity,
          available_vehicles: station.available_vehicles,
          available_slots: station.available_slots,
        },
        geometry: {
          type: "Point",
          coordinates: [station.longitude, station.latitude],
        },
      };
    }),
  };
};
export default jsonToGeoJson;
