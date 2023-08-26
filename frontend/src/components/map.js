import React, { useState, useRef } from "react";
import { GoogleMap, InfoWindow, LoadScript, MarkerF } from "@react-google-maps/api";
import api_key from "../config";
import axios from "axios";

function Map({ locationData }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState(locationData.slice(0, 50));
  const mapRef = useRef(null);

  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return;
    }
    setActiveMarker(markerId);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    locationData.forEach(({ latitude, longitude }) =>
      bounds.extend({ lat: parseFloat(latitude), lng: parseFloat(longitude) })
    );
    map.fitBounds(bounds);
    mapRef.current = map;
  };

  const handleLazyLoad = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      const bounds = map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      const markersInBounds = locationData.filter(
        ({ latitude, longitude }) =>
          parseFloat(latitude) >= sw.lat() &&
          parseFloat(latitude) <= ne.lat() &&
          parseFloat(longitude) >= sw.lng() &&
          parseFloat(longitude) <= ne.lng()
      );

      setVisibleMarkers(markersInBounds.slice(0, 1000));
    }
  };

  return (
    <LoadScript googleMapsApiKey={api_key}>
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        onBoundsChanged={handleLazyLoad}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
      >
        {visibleMarkers.map(({ block_id, latitude, longitude }) => (
          <MarkerF
            key={block_id}
            position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
            onClick={() => handleActiveMarker(parseInt(block_id))}
          >
            {activeMarker === parseInt(block_id) && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>Block ID: {block_id}</div>
              </InfoWindow>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
