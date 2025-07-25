const DisplayWeather = ({weather})=>
{
    if(weather) {
        const iconSource = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        return (
            <>
                <h3>Weather in {weather.name}</h3>
                <div>Temperature {(weather.temp-273.15).toFixed(2)} Celsius</div>
                <img src={iconSource} alt="" />
                <div>Wind {weather.speed} m/s</div>
            </>   
    )}
    return null
}

export default DisplayWeather