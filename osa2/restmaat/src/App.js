import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Käytä tätä ajamiseen:
// set "REACT_APP_API_KEY=f210867a7f14daca45b91838ad1b0caf" && npm start

const api_key = process.env.REACT_APP_API_KEY

function App() {
  const [ newSearch, setNewSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ errorText, setErrorText ] = useState('')
  
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)

    if (event.target.value.length > 0) {
      axios
        .get('https://restcountries.eu/rest/v2/name/' + event.target.value)
        .then( response => {
          if (response.data.length > 10) {
            setErrorText('Too many matches, please specify query')
            setCountries([])
          } else if (response.data.length >= 1 && response.data.length <= 10) {
            setErrorText('')
            setCountries(response.data)
          } else {
            setErrorText('')
            setCountries([])
          }
        })
    }
  }

  if (countries.length == 1) {
    return (
      <div>
        <Search newSearch={newSearch} handleSearchChange={handleSearchChange}/>
        <Error text={errorText} />
        {<CountryLong name={countries[0].name} capital={countries[0].capital} population={countries[0].population} languages={countries[0].languages.map( lang => lang.name)} flag={countries[0].flag} />}
      </div>
    );
  } else {
    return (
      <div>
        <Search newSearch={newSearch} handleSearchChange={handleSearchChange}/>
        <Error text={errorText} />
        {countries.map( (country, i) => <CountryName key={i} name={country.name} countries={countries} setCountries={setCountries} />)}
      </div>
    );
  }
}

const Search = (props) => {
  return (
    <div>
      Search: <input value={props.newSearch} onChange={props.handleSearchChange} />
    </div>
  )
}

const CountryLong = (props) => {
  const [ temperature, setTemperature ] = useState(0)
  const [ icon, setIcon ] = useState('')
  const [ wind, setWind ] = useState('')


  useEffect( () => {
    axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + props.capital)
      .then( response => {
        console.log(response.data)
        console.log(response.data.current)
        console.log(response.data.success)
        setTemperature(response.data.current.temperature)
        setIcon(response.data.current.weather_icons[0])
        setWind(response.data.current.wind_speed + ' mph direction ' + response.data.current.wind_dir)
      })
  }, [])

  return (
    <div>
      <h1>{props.name}</h1>
      <p>
        capital {props.capital}<br />
        population {props.population}
      </p>
      <h2>Languages</h2>
      <ul>
        {props.languages.map( (lang, i) => <li key={i}>{lang}</li>)}
      </ul>
      <img src={props.flag} width="200px" />
      <h2>Weather in {props.capital}</h2>
      Temperature: {temperature}<br />
      Wind: {wind}<br />
      <img src={icon} />
    </div>
  )
}

const CountryName = (props) => {
  return (
    <div>
      {props.name} <button onClick={ () => props.setCountries(props.countries.filter( country => country.name == props.name )) }>Show</button>
    </div>
  )
}

const Error = (props) => {
  return (
    <p>{props.text}</p>
  )
}

export default App;