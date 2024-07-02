import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all"
const api_request = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=`

const CurrentWeather = ({capital}) => {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
    .get(`${api_request}${capital}&aqi=no`)
    .then((response) => {
      setWeather(response.data)
    })
  }
  , [capital])

  if (!weather) {
    return <div>Loading weather...</div>;
  }
  return (
    <div>
      <p>Temperature: {weather.current.temp_c} degrees Celsius</p>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text} width="100"></img>
      <p>Wind: {weather.current.wind_kph} k/ph</p>
    </div>
  )
}

const Results = ({matches, setMatches}) => {
  var message = "" 

  if (matches.length > 10) {
    message = "Too many matches, specify another filter"
  }  else if (matches.length <= 10 && matches.length > 1) {
    message = matches.map((country) => (
      <li key={country.name}>
        {country.name} <button onClick={() => setMatches([country])}>show</button>
        </li>

    ))
  } else if (matches.length === 1) {
    message = matches.map((country) => (
      <div key={country.name}>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Area: {country.area}</p>
        <img src={country.flag} alt={`Flag of ${country.name}`} width="200"/>
        <h3>Weather in {country.capital}</h3>
        <CurrentWeather capital={country.capital}/>
      </div>
    ));
  }
  return (
    <div>
      {message}
    </div>
  )
}

function App() {
  const [matches, setMatches] = useState([])
  const [value, setValue] = useState([])

  useEffect(() => {
    // Fetch all countries on mount
    axios.get(baseURL)
      .then((response) => {
        const countries = response.data
        const countryNames = countries.map(country => ({
          name: country.name.common,
          capital: country.capital ? country.capital[0] : 'N/A', // Capital might be an array
          area: country.area,
          population: country.population,
          flag: country.flags.png
        }))
        console.log('countryNames:', countryNames)
        setMatches(countryNames)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onSearch = (event) => {
    event.preventDefault()
    }

  const handleChange = (event) => {
    const inputValue = event.target.value
    setValue(inputValue)
    console.log('value', inputValue)
    
    if (value) {
      console.log('matches:', matches)
      const filteredNames = matches.filter((country) => 
      country.name.toLowerCase().includes(inputValue.toLowerCase())
    );
      console.log('filteredNames:', filteredNames)
      setMatches(filteredNames)
        }
    }
  
  return (
    <form onSubmit={onSearch} matches={matches}>
      Find countries:
      <input value={value} onChange={handleChange}></input> 
      <Results matches={matches} setMatches={setMatches} />
    </form>
  )
}

export default App
