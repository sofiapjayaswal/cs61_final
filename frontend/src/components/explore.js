import React, {useState} from 'react';
import Map from './map';
import axios from 'axios';

function Explore(props) {
  const backendUrl = 'http://localhost:9090';
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataFilter, setDataFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);
  const [areFiltersSet, setAreFiltersSet] = useState(false);

  // useEffect(() => {
  //   axios.get(`${backendUrl}/data`, {para})
  //     .then(response => {
  //       setLocationData(response.data);
  //       setIsLoaded(true); // Set isLoaded to true after locationData is set
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const checkFormReady = () => {
    if (dataFilter && locationFilter) {
      setAreFiltersSet(true);
    } else {
      setAreFiltersSet(false);
    }
  };

  const handleSubmit = () => {
    if (areFiltersSet) {
      axios.get(`${backendUrl}/data`, {params: { location: locationFilter, dataType: dataFilter }})
      .then(response => {
        setData(response.data);
        setIsLoaded(true); // Set isLoaded to true after locationData is set
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    // handle database call here
  };
  return (
    <div id="explore">
      <li className="mapFilters">
          <h2>Filter By:</h2>
          <ul><button className="filterButton" onClick={()=>{setLocationFilter("North"); checkFormReady()}}>Northern California</button></ul>
          <ul><button className="filterButton" onClick={()=>{setLocationFilter("Central"); checkFormReady()}}>Central California</button></ul>
          <ul><button className="filterButton" onClick={()=>{setLocationFilter("South"); checkFormReady()}}>Southern California</button></ul>
      </li>
      <li className="mapFilters">
        <h2>View Data For Blocks Related To:</h2>
        <ul><button className="filterButton" onClick={()=>{setDataFilter("financial_info"); checkFormReady()}}>Financial Information</button></ul>
        <ul><button className="filterButton" onClick={()=>{setDataFilter("ocean_proximity"); checkFormReady()}}>Ocean Proximity</button></ul>
        <ul><button className="filterButton" onClick={()=>{setDataFilter("house_size"); checkFormReady()}}>House Size</button></ul>
        <ul><button className="filterButton" onClick={()=>{setDataFilter("block_size"); checkFormReady()}}>Block Size</button></ul>
        <ul><button className="filterButton" onClick={()=>{setDataFilter("house_age"); checkFormReady()}}>House Age</button></ul>
      </li>
      <button onClick={handleSubmit} disabled={!areFiltersSet}>
        Submit
      </button>
      <div id="mapContainer">
        {isLoaded ? <Map data={data} dataFilter={dataFilter} /> : <p>Loading...</p>}
      </div>
    </div>
    );
}

export default Explore;
