import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./componets/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);


      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick =async (e) => {
    const data = await getFormattedWeatherData(city, units);
    setWeather(data);  
  };

  const enterKeyPressed = (e) => {
   setCity(e.target.value);
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onChange={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={() => handleUnitsClick()}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

     
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;