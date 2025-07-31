import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import axios from 'axios'
import Display from './components/Display'

const App = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [currCountry, setCurrCountry] = useState(null)
  const [currWeather, setCurrWeather] = useState(null)
  const openWeatherApiKey = '4e2b84ca38f0a0786621becdc7884ee0'

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
        setFilteredCountries(filteredCountries)
        getCountry(filteredCountries[0])
        //console.log('tempCountry value: ', tempCountry)
        //getCityWeather(tempCountry.capital[0], tempCountry.cca2)
        //getCityWeather(currCountry.capital, currCountry.cca2)
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
        const tempCountry = {common, cca2 ,capital, area, languages, flags }
        console.log('TempCountry inside getCountry: ', tempCountry)
        //return (tempCountry)
        getCityWeather(tempCountry.capital[0], tempCountry.cca2)
        setCurrCountry(tempCountry)
      })
      .catch((error) => {
        console.error('Error fetching country details:', error)
      })
    } 
  }

  const getCityWeather = (cityName, countryCode) => {
    if (cityName) {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${openWeatherApiKey}`)
      .then(response => {
        //console.log('Weather Info: ', response.data)
        const {main: {temp}, weather: {icon}, wind: {speed}, name} = response.data
        const tempWeather  = {temp, icon, speed, name}
        setCurrWeather(tempWeather)
        //return tempWeather
      })
      .catch((error) => {
        console.error('Error fetching weather details: ', error)
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
      <Display
        country = {currCountry}
        weather={currWeather}
        filteredCountries={filteredCountries}
        selectCountry={selectCountry}
      />
    </div>
  )
}

export default App
