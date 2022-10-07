import coordsToMeters from "./coordsToMeters";

const createJointArray =
  () =>
  ({ userCoords, stations }) => {
    const updatedStations = stations.DockingStations.map((station, index) => {
      const distanceToStation = coordsToMeters(
        stations.DockingStations[index].Latitude,
        stations.DockingStations[index].Longitude,
        userCoords.latitude,
        userCoords.longitude
      );

      return {
        freeBikes: stations[index].FreeBikes,
        distanceToStation,
        ...station,
      };
    });

    return updatedStations.sort((a, b) =>
      a.distanceToStation > b.distanceToStation ? 1 : -1
    );
  };
