import type { LayerProps } from "react-map-gl";

export const stationLayer: LayerProps = {
  id: "stationText",
  type: "symbol",
  source: "stations",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "text-field": [
      "format",
      ["get", "available_vehicles"],
      {
        "font-scale": 1,
        "font-weight": 1.1,
      },
    ],
    "icon-allow-overlap": true,
    "text-allow-overlap": true,
    "text-offset": [-0.8, 0],
    "icon-image": "bike-marker",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "icon-size": 1,
  },
  paint: {
    "text-color": [
      "case",
      ["<", ["get", "available_vehicles"], 1],
      "grey",
      "#00f260",
    ],
  },
};

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "stations",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "#242222",
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "stations",
  filter: ["has", "point_count"],
  paint: {
    "text-color": "white",
  },
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};
