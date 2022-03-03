import React, { useState } from 'react';  // import React and useState

import { fetchWeather } from './api/fetchWeather';  // import the function from the api
import './App.css';  // import the css file

const App = () => {
    const [query, setQuery] = useState(''); // query is the state, setQuery is the function to update the state
    const [weather, setWeather] = useState({}); // weather is the state, setWeather is the function to update the state
    
    const search = async (e) => { // search is the function to call the API
        if(e.key === 'Enter') { // if the user presses enter
            const data = await fetchWeather(query); // call the API

            setWeather(data); // update the state
            setQuery(''); // reset the input
        }
    }   

    return ( // return the JSX
        <div className="main-container"> 
            <input type="text"className="search"placeholder="Search..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
            {weather.main && (
                <div className="city">  
                    <h2 className="city-name">  
                        <span>{weather.name}</span>  {/* weather.name is the name of the city */}
                        <sup>{weather.sys.country}</sup>  {/* sys.country is the country of the city */}
                    </h2>  {/* city-name */}
                    <div className="city-temp"> {/* city-temp */}
                        {Math.round(weather.main.temp)} {/* main.temp is the temperature of the city */}
                        <sup>&deg;C</sup> {/* &deg;C is the symbol for degrees */}
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />  {/* weather.weather[0].icon is the icon of the weather */}
                        <p>{weather.weather[0].description}</p>  {/* weather.weather[0].description is the description of the weather */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;  // export the App component
