import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import axios from 'axios'
import Display from './components/Display'

const App = () => {

  const [filter, setFilter] = useState('')
  const [firstRun, setFirstRun] = useState(true)
  const [countries, setCountries] = useState([])
  const [currCountry, setCurrCountry] = useState(null)

  //let alterCountries = []

  const getCountries = () => {
    if (firstRun) {
      axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('Response: ', response.data)
        const tempCountries = response.data.map(country => country.name.common)
        setCountries(tempCountries)
        //alterCountries = tempCountries
        //console.log('Country Names: ', countries)
      })
      setFirstRun(false)
    }
  }

  const getCountry = (countryName) => {
    if (countryName) {
      console.log (`Country to display: ${countryName}`)
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(response => {
        const {name: {common}, capital, area, languages, flags } = response.data
        const tempCountry = {common, capital, area, languages, flags }
        setCurrCountry(tempCountry)
        console.log('Response from invoking for one country: ', response.data)
        console.log('Simplified data: ', currCountry)
      })
    }
  }


  getCountries()
  
  useEffect(() => {
    console.log('effect run, filter is now', filter)

    if (filter) {
      console.log('Filter is not null')
      const filteredCountries =
        countries.filter(country =>
          country.toUpperCase().includes(filter.toLocaleUpperCase()))
      if (filteredCountries.length === 1)
      {
        setCurrCountry(getCountry(filteredCountries[0]))
      } else {
        setCurrCountry(getCountry(null))
      }
      console.log('Matching countries :', filteredCountries.length, filteredCountries)
    }
  }, [filter])

  const handleFilterChange = (event) => {
    console.log('filter:', event.target.value.toUpperCase())
    console.log('total number of countries availabe: ', countries.length)
    setFilter(event.target.value)
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
      />
    </div>
  )
}

export default App
