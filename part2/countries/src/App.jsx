import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import axios from 'axios'

const App = () => {

  const [filter, setFilter] = useState('')
  const [firstRun, setFirstRun] = useState(true)
  const [countries, setCountries] = useState([])

  //let alterCountries = []

  const getCountries = () => {
    if (firstRun) {
      axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('Response: ', response.data)
        const tempCountries = response.data.map(country => country.name)
        setCountries(tempCountries)
        //alterCountries = tempCountries
        //console.log('Country Names: ', countries)
      })
      setFirstRun(false)
    }
  }

  getCountries()
  
  useEffect(() => {
    console.log('effect run, filter is now', filter)

    if (filter) {
      console.log('Filter is not null')
      const filteredCountries =
        countries.filter(country =>
          country.common.toUpperCase().includes(filter.toLocaleUpperCase()))
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
    </div>
  )
}

export default App
