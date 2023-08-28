import './App.css';
import {
  BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from './components/home';
import Explore from './components/explore';
import Visualizations from './components/visualizations'

library.add(faHouseLaptop);

function App() {
  return (
    <div id="root">
    <BrowserRouter>
      <div id="nav-bar">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/query" element={<Explore />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

function Nav(props) {
  return (
    <nav>
      <ul>
        <div>
          <li><NavLink to="/"><FontAwesomeIcon id="home-icon" icon="house-laptop" /></NavLink></li>
        </div>
        <div id="non-home-nav">
          <li><NavLink to="/visualizations">Visualizations</NavLink></li>
          <li><NavLink to="/query">Explore/Query</NavLink></li>
        </div>
      </ul>
    </nav>
  );
}

export default App;
