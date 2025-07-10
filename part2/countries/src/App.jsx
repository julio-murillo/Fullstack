import { useState, useEffect } from 'react'
import Filter from "./components/Filter"

const App = () => {

  const [filter, setFilter] = useState(null)

  useEffect(() => {
    console.log('effect run, filter is now', filter)

    if (filter) {
      console.log(fe)
    }
  }, [filter])

  const handleFilterChange = (event) => {
    console.log('filter:', event.target.value.toUpperCase())
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
