import React, {useEffect, useState, useCallback} from 'react';
import Map from './map';
import axios from 'axios';
import Dropdown from './filterDropdown';

function Explore(props) {
  const backendUrl = 'https://cs61-final-backend.onrender.com';
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataFilter, setDataFilter] = useState(
    [
      {
        id: 0,
        title: 'Financial Information',
        selected: false,
        key: 'dataFilter'
      },
      {
          id: 1,
          title: 'Ocean Proximity',
          selected: false,
          key: 'dataFilter'
      },
      {
          id: 2,
          title: 'Block Size',
          selected: false,
          key: 'dataFilter'
      },
      {
        id: 3,
        title: 'House Size',
        selected: false,
        key: 'dataFilter'
      },
      {
        id: 4,
        title: 'House Age',
        selected: false,
        key: 'dataFilter'
      }
    ]
  );
  const [locationFilter, setLocationFilter] = useState(
    [
      {
          id: 0,
          title: 'Northern California',
          selected: false,
          key: 'locationFilter'
      },
      {
          id: 1,
          title: 'Central California',
          selected: false,
          key: 'locationFilter'
      },
      {
          id: 2,
          title: 'Southern California',
          selected: false,
          key: 'locationFilter'
      }
    ]
  );
  const [areFiltersSet, setAreFiltersSet] = useState(false);

  const checkFormReady = useCallback(async () => {
    if (
      locationFilter.some(location => location.selected === true) &&
      dataFilter.some(filter => filter.selected === true)
    ) {
      setAreFiltersSet(true);
    } else {
      setAreFiltersSet(false);
    }
  }, [dataFilter, locationFilter]);

  useEffect(() => {
    checkFormReady()
  }, [dataFilter, locationFilter, checkFormReady]); // An array of dependencies (optional)

  const locationResetThenSet = (id, key) => {
    const temp = [...locationFilter]; // create temp copy to update one item to selected true

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    setLocationFilter(temp);
  };
  
  const dataResetThenSet = (id, key) => {
    const temp = [...dataFilter]; // create temp copy to update one item to selected true

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    setDataFilter(temp);
  };

  

  const handleSubmit = async ()  => {
    if (areFiltersSet) {
      setIsUpdating(true)
      await axios.get(`${backendUrl}/data`, {params: { location: locationFilter.find(location => location.selected === true).title, dataType: dataFilter.find(filter => filter.selected === true).title }})
      .then(response => {
        setData(response.data);
        setIsLoaded(true)
        setIsUpdating(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  };

  const renderUpdatingMessage = () => {
    if (isUpdating) {
      return (
        <div id="updatingMessage">Updating and fetching data...</div>
      )
    } else {
      return null
    }
  }
  return (
    <div id="explore">
      <div id="instructions"> 
        <h2><strong>Instructions for Querying/Using the Map:</strong></h2>
        <div>Below you will see two dropdown menus where you can select from several options.
          The first dropdown menu is where you select what region of California you want to focus on — North, Central, or South.
          The second dropdown is where you select what type of data you want to examine for the blocks of California.
          Once you have both selected, press submit and a map will appear with markers. As you zoom in on the map, more markers will appear.
          Press on a marker to view data about the specific block. This data is being retrieved from the database we created. If you want
          to perform another query, you can select new options from the dropdown menus and press submit again. Note that if you change the region,
          you will have to move, using your mouse, to the region on the map.
        </div>
      </div>
      <div id="dropdowns">
        <Dropdown
          title="Select Location"
          ddList={locationFilter}
          resetThenSet={locationResetThenSet}
        />
        <Dropdown
          title="Select Data To Examine"
          ddList={dataFilter}
          resetThenSet={dataResetThenSet}
        />
      </div>
      <button id="submit" onClick={handleSubmit} disabled={!areFiltersSet}>
        Submit
      </button>
      {renderUpdatingMessage()}
      <div id="mapContainer">
        {isLoaded ? <Map data={data} dataFilter={dataFilter.find(filter => filter.selected === true).title} /> : <p>Select filters above to view map!</p>}
      </div>
    </div>
    );
}

export default Explore;
