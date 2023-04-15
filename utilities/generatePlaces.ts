type LatLngLiteral = google.maps.LatLngLiteral;

export const generatePlaces = (position: LatLngLiteral | undefined) => {
  const _places: Array<LatLngLiteral> = [];
  for (let i = 0; i < 2; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    if (position) {
      _places.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
      });
    }
  }
  console.log("_places", _places);
  return _places;
};
