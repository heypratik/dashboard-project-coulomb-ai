import React, { useContext, useState, useEffect } from 'react'
import MapComponent from "./components/MapComponent";
import LineChart from "./components/LineChart";
import List from "./components/List";
import {HiMap} from 'react-icons/hi'
import {GiBatteryPack} from 'react-icons/gi'
import {GrMenu} from 'react-icons/gr'
import {Context} from './lib/Context'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {  
  const { handleCheckboxChange, isMapPage, setMapPage, formState } = useContext(Context)
  return (
    <Router>
    <div className="App">
      <div className="nav">
        <div className="logo">
        <img src='https://svgshare.com/i/n83.svg' />
        </div>
        <Link className='a-menu' onClick={() => setMapPage(true)} to={'/'}>
        <div className={`menu ${isMapPage ? 'active' : ''}`}><HiMap className="menu-icon" /><p>Map Clusters</p></div>
        </Link>
        <Link className='a-menu' onClick={() => setMapPage(false)} to={'/batteries'}>
        <div className={`menu ${isMapPage ? '' : 'active'}`}><GiBatteryPack className="menu-icon" /><p>Batteries</p></div>
        </Link>
      </div>
      <div className="main">
        { isMapPage && <div className="map-menu">
        <div className="form">
        <label>
        <input className='checkbox-input' checked={formState.includes('Delhi') ? true: false} type = 'checkbox' label='Delhi' name = 'clusters' value={'Delhi'} onChange={(e) => handleCheckboxChange(e)}/>
        New Delhi</label>
        </div>
        <div className="form">
        <label>
        <input className='checkbox-input' checked={formState.includes('Mumbai') ? true: false} type = 'checkbox' label='Mumbai' name = 'clusters' value={'Mumbai'} onChange={(e) => handleCheckboxChange(e)}/>
        Mumbai</label>
        </div>
          <div className="form">
          <label>
          <input className='checkbox-input' checked={formState.includes('Banglore') ? true: false} type = 'checkbox' name = 'clusters' value={'Banglore'} onChange={(e) => handleCheckboxChange(e)}/>
          Banglore</label>
          </div>
          <div className="form">
        <label>
        <input className='checkbox-input' checked={formState.includes('Kolkata') ? true: false} type = 'checkbox' label='Kolkata' name = 'clusters' value={'Kolkata'} onChange={(e) => handleCheckboxChange(e)}/>
        Kolkata</label>
        </div>
        </div>}
        <Routes>
        <Route exact path="/" element={<MapComponent/>}/>
        <Route exact path="/batteries" element={<List/>}/>
        <Route exact path="/charts" element={<LineChart/>}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;