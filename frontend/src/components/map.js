import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import api_key from "../config";
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    
  };
  
Modal.setAppElement('#root');

function Map({ data, dataFilter }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState(data.slice(0, 50));
  const mapRef = useRef(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
      setIsOpen(false);
  }

  const handleActiveMarker = (markerId) => {
      if (markerId === activeMarker) {
          return;
      }
      setActiveMarker(parseFloat(markerId));
      openModal()
  };
  
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    data.forEach(({ latitude, longitude }) =>
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

      const markersInBounds = data.filter(
        ({ latitude, longitude }) =>
          parseFloat(latitude) >= sw.lat() &&
          parseFloat(latitude) <= ne.lat() &&
          parseFloat(longitude) >= sw.lng() &&
          parseFloat(longitude) <= ne.lng()
      );

      setVisibleMarkers(markersInBounds.slice(0, 1000));
    }
  };
  
  const conditionalRenderModalContent = (block_id, latitude, longitude) => {
    const blockData = data.find(obj => obj.block_id === block_id);
    if (blockData) {
      if (dataFilter === "Financial Information") {
        const median_income = blockData.median_income;
        const median_house_value = blockData.median_house_value;
        return (
          <div className="modalContent">
            <h2>Financial Information for block located at ({latitude}, {longitude})</h2>
            <div>Median Income: {median_income}</div>
            <div>Median House Value: {median_house_value}</div>
          </div>
        )
      } else if (dataFilter === "Ocean Proximity") {
        const ocean_prox = blockData.ocean_prox;
        console.log(ocean_prox)
        return (
          <div className="modalContent">
            <h2>Ocean proximity for block located at ({latitude}, {longitude})</h2>
            <div>Ocean Proximity: {ocean_prox}</div>
          </div>
        )
      } else if (dataFilter === "Block Size") {
        const population = blockData.population;
        const households = blockData.households;
        const population_density = parseFloat(population/households).toFixed(2);
        return (
          <div className="modalContent">
            <h2>Block size information for block located at ({latitude}, {longitude})</h2>
            <div>Population of block: {population}</div>
            <div>Number of households: {population}</div>
            <div>Population Density: {population_density} people/households</div>
          </div>
        )
      } else if (dataFilter === "House Size") {
        const total_rooms = blockData.total_rooms;
        const total_bedrooms = blockData.total_bedrooms;
        return (
          <div className="modalContent">
            <h2>House size information for block located at ({latitude}, {longitude})</h2>
            <div>Total number of rooms on block: {total_rooms}</div>
            <div>Total number of bedrooms on block: {total_bedrooms}</div>
          </div>
        )
      } else if (dataFilter === "House Age") {
        const median_age = blockData.housing_median_age;
        return (
          <div className="modalContent">
            <h2>House age information for block located at ({latitude}, {longitude})</h2>
            <div>Median House Age: {median_age}</div>
          </div>
        )
      }
    }
  }
  return (
    <LoadScript googleMapsApiKey={api_key}>
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        onBoundsChanged={handleLazyLoad}
        mapContainerStyle={{ width: "80vw", height: "100vh" }}
      >
        {visibleMarkers.map(({ block_id, latitude, longitude }) => (
          <MarkerF
            key={block_id}
            position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
            onClick={() => handleActiveMarker(parseInt(block_id))}
          >
              {activeMarker === block_id && (
              <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
              >
                  {conditionalRenderModalContent(block_id, latitude, longitude)}
                  <button id="closeButton" onClick={closeModal}>close</button>
              </Modal>
              )}
          </MarkerF>
        ))}
      </GoogleMap>
    </LoadScript>
    );
  }
  
  export default Map;
  