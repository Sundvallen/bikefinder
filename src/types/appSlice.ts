import { Station } from "./shared";

// BASICALLY
// ALWAYS USE TYPES
// You can't hover imported interfaces

type StationsState = {
  list: Station[];
  currentStation: Station | undefined;
};

export type UserCoords = {
  latitude: number;
  longitude: number;
};

type AppViewState = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type State = {
  activeSection: string;
  stations: StationsState;
  userCoords: UserCoords | {};
  loading: boolean;
  showPopup: boolean;
  appViewState: AppViewState;
};
