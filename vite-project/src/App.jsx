import React, { useState, useEffect } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!city) return;
      setLoading(true);
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f22ef0f32f0b0d02e6c76706474a7f6e&units=${unit}`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city, unit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <nav className="navbar bg-dark text-light mb-5">
            <div className="container-fluid">
                <h3 className="mx-auto">The Weather of the citys</h3>
            </div>
        </nav>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <input type="text" name="city" placeholder="Enter city name" />
        <button class="btn btn-primary input-group-text" type="submit">Buscar</button>
        <br />
        <label>
          <input
            type="radio"
            value="metric"
            checked={unit === "metric"}
            onChange={handleUnitChange}
          />
          Celsius
        </label>
        <label>
          <input
            type="radio"
            value="imperial"
            checked={unit === "imperial"}
            onChange={handleUnitChange}
          />
          Fahrenheit
        </label>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData.main ? (
        <div>
          <p>
            Date:{" "}
            {new Date(weatherData.dt * 1000).toLocaleDateString("en-US")}
          </p>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      ) : (
        <p>Enter a city name to get the weather</p>
      )}
    </div>
  );
};

export default App;

