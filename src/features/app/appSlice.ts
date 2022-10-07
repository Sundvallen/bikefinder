import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import mockData from "../../mocks/stations";
import { Station } from "../../types/shared";
import { State, UserCoords } from "../../types/appSlice";

const initialState: State = {
  activeSection: "Map",
  stations: {
    list: [],
    currentStation: undefined,
  },
  userCoords: {},
  loading: true,
  showPopup: true,
  appViewState: {
    latitude: 58.96366044370475,
    longitude: 5.7102100445339214,
    zoom: 12,
  },
};

const endPointUrl =
  "https://opencom.no/dataset/00b94410-ea79-49de-a10f-1a0c10c8b842/resource/6539f285-9de4-45bf-8369-c1f3960f12c7/download/bysykkel.json";

export const getData = createAsyncThunk<Station[]>(
  "app/getData",
  async (payload, { dispatch }) => {
    // const res = await fetch(endPointUrl);
    // const data = await res.json();
    // return data

    return mockData;
  }
);

export const getUserCoords = createAsyncThunk<UserCoords>(
  "app/getUserCoords",
  async (payload, { dispatch }) => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((res) => {
        resolve({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        });
      });
    });
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    setCurrentStation: (state, { payload }) => {
      if (payload) {
        const stations = state.stations.list;
        const station =
          stations[stations.findIndex((station) => station.id === payload)];
        state.stations.currentStation = station;
        return;
      }
      state.stations.currentStation = undefined;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
    setAppViewState: (state, action) => {
      state.appViewState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      state.stations.list = payload;
    });
    builder.addCase(getUserCoords.fulfilled, (state, { payload }) => {
      state.userCoords = payload;
    });
    builder.addCase(getUserCoords.rejected, (state, { payload }) => {
      state.userCoords = {
        latitude: 58.96366044370475,
        longitude: 5.7102100445339214,
      };
    });
  },
});

export const {
  setAppViewState,
  setActiveSection,
  setCurrentStation,
  setLoading,
  setShowPopup,
} = appSlice.actions;

export default appSlice.reducer;
