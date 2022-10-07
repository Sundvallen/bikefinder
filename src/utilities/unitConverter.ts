export default (distance) => {
	if (distance >= 1000) {
		return (distance = (distance / 1000).toFixed(1) + " km");
	} else {
		return Math.floor(distance / 100) * 100 + " m";
	}
};
