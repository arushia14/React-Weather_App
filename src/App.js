import React, { useState } from "react";
import "./styles.css";

const api = {
  key: "c8adcb2ccafd7f050b0435c69ef02bdb",
  base: "https://api.openweathermap.org/data/2.5/"
};
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
var today = new Date();
var formattedDate = today.toLocaleDateString("en-US", options);

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp < 16
            ? "app cold"
            : "app warm"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter place"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location tracking-in-expand">
              {weather.name},{weather.sys.country}
            </div>
            <div className="date tracking-in-expand">{formattedDate}</div>
            <div className="temp tracking-in-expand">
              {Math.round(weather.main.temp)}˚C
            </div>
            <div className="weather tracking-in-expand">
              {weather.weather[0].main}
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
