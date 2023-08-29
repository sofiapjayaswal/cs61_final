import React from 'react';

function Visualizations(props) {
  return (
    <div id="visualizations">
      <h1>Analytics/Visualizations for California Housing Prices</h1>
      <div className="graphSection">
        <h2>Graph #1: Housing Sizes and House age</h2>
        <img src={require("../assets/img/graph1.png")} alt="Graph showing relationship between Housing Prices and House Age" />
        <p className="graphDescrip">
          There is a clear relationship present from the graph: as time progresses, more rooms arise on the block. 
          Both total rooms and total bedrooms show this relationship (visible by the upward motion 
          of the lines). This correlation makes sense when you look at the population of California from 1970-current 
          (see graph below from this <a href='https://www.macrotrends.net/states/california/population' rel="noreferrer" target="_blank">source</a>). It makes sense that as the population increases, more housing needs to be provided to accommodate 
          the influx of people. As more housing is generated, more rooms are constructed.
        </p>
        <img src={require("../assets/img/graph4.png")} alt="Graph of California's Population Growth" />
      </div>
      <hr/>
      <div className="graphSection">
        <h2>Graph #2: Correlation between Ocean Proximity and House Value</h2>
        <div id="graph2">
          <img src={require("../assets/img/graph2.png")} alt="Graph showing relationship between Ocean Proximity and House Value" />
          <p className="graphDescrip">
            We were relatively surprised by the results of the graph. Our initial thought would be that the near 
            ocean section would be the most expensive, however the island section was. This makes sense, however, when 
            you factor in islands such as Catalina Island which is notorious for its expensive real estate. The inland section 
            was the least expensive, which followed our predictions.
          </p>
        </div>
      </div>
      <div className="graphSection">
        <h2>Graph #3: Map Visualizations</h2>
        <div className="graph3" >
          <img id="imgLeft" src={require("../assets/img/graph3.png")} alt="Map Visualization" />
          <p className="graphDescrip">
            Our map displays the median_house_value (median of the household prices of all the houses in the block). 
            The colors indicate which price sector the block falls into. Houses under $100,000 are colored green, houses between 
            $100,000 to $500,000 are colored purple, houses between $500,000 and $1,000,000 are red, and houses over $1,000,000 
            are colored blue.
          </p>
        </div>
        <div className="graph3">
          <p className="graphDescrip">
            The map provided an interesting complement to our graphical results from Graph #2. Many of the more inland housing blocks are colored purple 
            (less than 100,000 in median value), which supported our graphical results. Homes in Newport Beach and Beverly Hills predominantly fall within the 
            higher-priced brackets, reflecting the premium real estate trends associated with these locations.
          </p>
          <img src={require("../assets/img/graph5.png")} alt="Graph of California's Population Growth" />  
        </div>
      </div>
      <a href='https://colab.research.google.com/drive/12JzOhJDIA2z4OqKoCXC_UrYxwxjRjwsj?usp=sharing' rel="noreferrer" target="_blank">Link to Code for Visualizations</a>
    </div>
  );
}

export default Visualizations;
