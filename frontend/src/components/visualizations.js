import React from 'react';

function Visualizations(props) {
  return (
    <div id="visualizations">
      <h1>Analytics/Visualizations for California Housing Prices</h1>
      <h3>Graph #1: Housing Sizes and House age</h3>
      <img src={require("../assets/img/graph1.png")} alt="Graph showing relationship between Housing Prices and House Age" />
      <p>
        There is a clear relationship present from the graph: as time progresses, more rooms arise on the block. 
        Both total rooms and total bedrooms show this relationship (visible by the upward motion 
        of the lines). This correlation makes sense when you look at the population of California from 1970-current 
        (see graph below from this <a href=''>source</a>). It makes sense that as the population increases, more housing needs to be provided to accommodate 
        the influx of people. As more housing is generated, more rooms are constructed.
      </p>
    </div>
  );
}

export default Visualizations;
