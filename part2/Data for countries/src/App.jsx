import { useEffect, useState } from "react";
import services from './services/services.jsx'

const App = () => {            

  const [country, setCountry] = useState('')
  const [data, setData] = useState([])

  const handleChange = (event) => {
    setCountry(event.target.value)
  }

  useEffect(() => {
       services
        .getData(country)
        .then(response => {
          console.log(response)
          setData(response)  
        })
        .catch(error => console.log(error))  
    } 
  ,[country])
 
  const countriesToShow = 
    country.trim() === '' ? [] : data.filter((c) => (
      c.name.common.toLowerCase().includes(country.toLowerCase())
    ))

  
  return (
  <div>
    find countries <input onChange={handleChange} value={country}/>
    <div>
      {country.trim() !== '' && countriesToShow.length > 10 && 
        <p>Too many matches, specify another filter</p> }

      {countriesToShow.length >1 && countriesToShow.length <= 10 && (
        <div>
          {countriesToShow.map(c => (<div key={c.cca3 || c.name.common}>
                                      {c.name.common}
                                    </div>))}
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
            
        </div>
      )}
    </div>
    
  </div>
  
)}


export default App
