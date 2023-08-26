import React, { useState } from "react";
import { GoogleMap, InfoWindow, LoadScript, MarkerF } from "@react-google-maps/api";
import api_key from "../config";
const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 }
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 }
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 }
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 40.712776, lng: -74.005974 }
  }
];

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return;
    }
    setActiveMarker(markerId);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <LoadScript
      googleMapsApiKey={api_key}
    >
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
      >
        {markers.map(({ id, name, position }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{name}</div>
              </InfoWindow>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;