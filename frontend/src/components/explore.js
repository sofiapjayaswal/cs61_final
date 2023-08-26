import React, {useEffect, useState} from 'react';
import Map from './map';
import axios from 'axios';
import SimpleMap from './simpleMap';

function Explore(props) {
  const backendUrl = 'http://localhost:9090';
  const [locationData, setLocationData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
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
            {isLoaded ? <Map locationData={locationData} /> : <p>Loading...</p>}
        </div>
    );
}

export default Explore;
