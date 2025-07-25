const DisplayCountry = ({country, filteredCountries, selectCountry}) =>
{
    //const country = props.country
    //console.log('Filtered countries :', filteredCountries)

    if (filteredCountries.length > 11)
    {
        return(
            <div key={'Too many'}>Too many matches, specify another filter</div>
        )
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10)
    {
        //console.log('Filtrados', filteredCountries)
        return(
            <div>
                <br />
                {
                    filteredCountries.map(filteredCountry =>
                        (<div key={filteredCountry}>
                            {filteredCountry}<button onClick={() => selectCountry(filteredCountry)}>Show</button>
                        </div>)
                    )
                }
            </div>
        )
    } else if (filteredCountries.length === 0)
    {
        return null

    } else if (country) {
        console.log('Displaying the following country: ', country)
        return(
        <>
            <h2>{country.common}</h2>
            <div>Capital {country.capital[0]}</div>
            <div>Area {country.area}</div>
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={country.flags?.png} alt={country.flags?.alt || 'Country Flag'} />
        </>
    )}
    return null;
}

export default DisplayCountry