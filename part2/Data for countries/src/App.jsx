import { useEffect, useState } from "react";
import services from './services/services.jsx'

const App = () => {

  const [country, setCountry] = useState('')
  const [data, setData] = useState([])
  const [weather, setWeather] = useState(null)

  const handleChange = (event) => {
    setCountry(event.target.value)
  }

  useEffect(() => {
       services
        .getData(country)
        .then(response => {
          //console.log(response)
          setData(response)  
        })
        .catch(error => console.log(error))
    } 
  ,[country])
 
  const countriesToShow = 
    country.trim() === '' ? [] : data.filter((c) => (
      c.name.common.toLowerCase().includes(country.toLowerCase())
    ))

  const handleShowCountry = (name) => {
    setCountry(name)
  }

  useEffect(() => {
    if(countriesToShow.length === 1)
    {
      const capital = countriesToShow[0]?.capital?.[0]

      if(capital)
      {
        services
        .getWeatherData(capital)
        .then(response => {
          console.log('weather Data received')
          console.log(response)
          setWeather(response)
      })}
      else
        setWeather(null)
    }},[countriesToShow])
  

  return (
  <div>
    find countries <input onChange={handleChange} value={country}/>
    <div>
      {country.trim() !== '' && countriesToShow.length > 10 && 
        <p>Too many matches, specify another filter</p> }

      {countriesToShow.length >1 && countriesToShow.length <= 10 && (
        <div>
          {countriesToShow.map(c => (
            <div key={c.cca3 || c.name.common}>
              <span>{c.name.common} </span>
              <button onClick={() => handleShowCountry(c.name.common)}>Show</button>
            </div>
          ))}
        </div> 
      )}
        

      {countriesToShow.length === 1 && (
        <div>
            <h2>{countriesToShow[0].name.common}</h2>
            <div>{countriesToShow[0].capital && countriesToShow[0].capital.length > 0 
                ? countriesToShow[0].capital[0] 
                : 'N/A'}
            </div>
            <div>
              Area {countriesToShow[0].area}
            </div>

            <h4>languages:</h4>
            <ul>
              {Object.values(countriesToShow[0].languages || {}).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
            </ul>

            <img
              src={countriesToShow[0].flags.png}
              alt={`Flag of ${countriesToShow[0].name.common}`}
              width="150"
            />

            
            {weather && (
              <div>
                <h4>weather in {countriesToShow[0].capital} </h4>
                <p>Temperature {weather?.main.temp} Celsius</p>
                {weather.weather?.[0] && (
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt={weather.weather[0].description}
                    width="50"
                  />
                )}
                <p>Wind {weather.wind?.speed }
                  {console.log(weather)} m/s</p>
              </div>
            )}
        </div>
      )}
    </div>
    
  </div>
  
)}


export default App