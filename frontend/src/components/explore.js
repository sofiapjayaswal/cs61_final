import React, {useEffect, useState} from 'react';
import Map from './map';
import axios from 'axios';

function Explore(props) {
  const backendUrl = 'http://localhost:9090';
  const [locationData, setLocationData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(`${backendUrl}/data`)
      .then(response => {
        setLocationData(response.data);
        setIsLoaded(true); // Set isLoaded to true after locationData is set
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

    return (
        <div id="explore">
          <li className="mapFilters">
              <h2>Filter By:</h2>
              <ul><button className="filterButton" onClick={()=>setFilter("financial")}>Northern California</button></ul>
              <ul><button className="filterButton" onClick={()=>setFilter("ocean")}>Central California</button></ul>
              <ul><button className="filterButton" onClick={()=>setFilter("population")}>Southern California</button></ul>
          </li>
          <li className="mapFilters">
            <h2>Filter By:</h2>
            <ul><button className="filterButton" onClick={()=>setFilter("financial")}>Financial Information</button></ul>
            <ul><button className="filterButton" onClick={()=>setFilter("ocean")}>Ocean Proximity</button></ul>
            <ul><button className="filterButton" onClick={()=>setFilter("population")}>Population Information</button></ul>
          </li>
          <div id="mapContainer">
            {isLoaded ? <Map locationData={locationData} /> : <p>Loading...</p>}
          </div>
        </div>
    );
}

export default Explore;
