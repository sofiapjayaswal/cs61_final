import React from 'react';

function Visualizations(props) {
  return (
    <div id="visualizations">
      <div id="textSection">   
        <h1>CS61 FINAL PROJECT</h1>
        <h2>California House Prices Database</h2>
        <p>Hi! Welcome to Paige and Sofia's COSC 61 final project site. For this project, we chose to examine California housing data by block. 
          We used <a href='https://www.kaggle.com/datasets/shibumohapatra/house-price' rel="noreferrer" target="_blank">Kaggle</a>, an online database tool, to acquire our data.
          We created a database from this data which this site references and queries. You can read more about the database we created on our <a href='https://github.com/sofiapjayaswal/cs61_final/wiki' rel="noreferrer" target="_blank">Github</a>.
          Our site has two main features: Analytics and Explore. To navigate to a section, click the buttons on the 
          upper section of this page. Our analytics page features graphs and charts we’ve generated from the data. Our Explore page 
          features an interactive map where users can filter their view of California housing information. Thank you for visiting our page! </p>
      </div>
      <div>
        <img src={require('../assets/img/California.jpg')} alt="California" />
      </div>
    </div>
  );
}

export default Visualizations;
