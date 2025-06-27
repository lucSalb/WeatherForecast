import logo from './logo.svg';
import './App.css';
import Weathercast from './components/weathercast';
import SearchLocation from './components/searchLocation';
import { useState } from "react";

const App = () => {
  const [userLocation, setUserLocation] = useState("London");

  return (
    <div>
      <SearchLocation setUserLocation={setUserLocation}/>
      <Weathercast userLocation={userLocation}/>
    </div>
  );
}

export default App;
