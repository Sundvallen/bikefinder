import {} from "react-map-gl";

export type Station = {
  id: string;
  external_id: string;
  name: string;
  description: string | null;
  capacity: number;
  available_slots: number;
  available_vehicles: number;
  reserved_vehicles: number;
  type: string;
  latitude: number;
  longitude: number;
};
