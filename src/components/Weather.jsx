import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from "../assets/search.png"
import sun_icon from "../assets/sun.png"
import clouds from "../assets/clouds.png"
import rain from "../assets/rain.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"


const Weather = () => {
   const inputRef = useRef()
   const [weatherData, setWeatherData]= useState(false);

      const allIcons = {
      "Sunny": sun_icon,
      "Clear": sun_icon,
      "Partly cloudy": clouds,
      "Cloudy": clouds,
      "Overcast": clouds,

      "Light rain": rain,
      "Moderate rain": rain,
      "Heavy rain": rain,
      "Patchy rain possible": rain,


   };

   const search = async(city) =>{
     if(city === ""){
      alert("Enter City Name")
      return;
     }
      try{


        const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`;

        const response = await fetch(url);
        const data = await response.json();
        if(!response.ok){
          alert(data.message);
          return;
        }
        console.log(data);
        const condition= data.current.condition.text;
        const selectedIcon= allIcons[condition]||sun_icon;

        setWeatherData(
          {
            humidity:data.current.humidity,
            windSpeed:data.current.wind_kph,
            temperature:Math.floor(data.current.temp_c),
            location:data.location.name,
            icon:selectedIcon

          }
        )


      }
      catch{
        setWeatherData(false);
        console.error("Error in Fetching weather Data")

      }
      
   }
   useEffect(() => {search("Sweden")},[])
  return (
    <div className='weather'>
        <div className="search-bar">
          <input ref={inputRef} type='text' placeholder='Search'></input>
          <img className="search-icon" src={search_icon} onClick={() => search(inputRef.current.value)}></img>
        </div>
        {weatherData ? <>
        {weatherData && <img className='sun-icon' src={weatherData.icon}></img>}
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon}></img>
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img className="wind-icon" src={wind_icon}></img>
            <div>
              <p>{weatherData.windSpeed}Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </> : <></>}
        
    </div>
  )
}

export default Weather
