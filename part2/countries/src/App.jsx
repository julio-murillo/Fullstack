import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import axios from 'axios'
import DisplayCountry from './components/DisplayCountry'
import DisplayWeather from './components/DisplayWeather'

const App = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [currCountry, setCurrCountry] = useState(null)
  const [currWeather, setCurrWeather] = useState(null)
  const openWeatherAPIKey = import.meta.env.VITE_SOME_KEY

  useEffect(()=>{
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        //console.log('Countries Fetched: ', response.data)
        const tempCountries = response.data.map(country => country.name.common)
        setCountries(tempCountries)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error)
      })
  }, [])
  
  useEffect(() => {
    //console.log('Filter upated - UseEffect working: ', filter)

    if (filter) {
      //console.log('Filter is not null')
      const filteredCountries =
        countries.filter(country =>
          country.toUpperCase().includes(filter.toUpperCase()))

      if (filteredCountries.length === 1)
      {
        //setCurrCountry(filteredCountries[0])
        getCountry(filteredCountries[0])
        setFilteredCountries(filteredCountries)
      } else {
        setCurrCountry(null)
        setCurrWeather(null)
        setFilteredCountries(filteredCountries)
      }
      //console.log('Matching countries :', filteredCountries.length, filteredCountries)
    } else {
      setCurrCountry(null)
      setCurrWeather(null)
      setFilteredCountries([])
    }
  }, [filter])

  const handleFilterChange = event => {
    //console.log('filter:', event.target.value.toUpperCase())
    //console.log('total number of countries availabe: ', countries.length)
    setFilter(event.target.value)
  }
  
  const selectCountry = country => {
    //console.log('Should display info about ', country)
    setFilter(country)
  }

  const getCountry = countryName => {
    //console.log('getCountry being executed')
    if (countryName) {
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(response => {
        console.log('Country details feched: ', response.data)
        const {name: {common}, cca2, capital, area, languages, flags } = response.data
        const tempCountry = {common, cca2, capital, area, languages, flags }
        setCurrCountry(tempCountry)
        getCountryWeather(tempCountry.capital[0], tempCountry.cca2)
      })
      .catch((error) => {
        console.error('Error fetching country details:', error)
      })
    } 
  }

  const getCountryWeather = (cityName, countryCode) => {
    if (cityName && countryCode){
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&APPID=${openWeatherAPIKey}`)
      .then(response => {
        console.log('Wheather in ', cityName, ': ', response.data)
        const {main: {temp}, wind: {speed}, weather, name} = response.data
        const weatherData = {temp, speed, weather, name}
        setCurrWeather (weatherData)
        console.log (`Weather data in ${cityName}: ${weatherData.temp}`)
      })
      .catch((error) => {
        console.error('Error fetching weather details:', error)
        setCurrWeather(null)
      })
    }
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter
        textToDisplay={'find countries '}
        textToFilterBy={filter}
        onChange={handleFilterChange}
      />
      <DisplayCountry
        country = {currCountry}
        filteredCountries={filteredCountries}
        selectCountry={selectCountry}
      />
      <DisplayWeather
        weather = {currWeather}
      />
    </div>
  )
}

export default App