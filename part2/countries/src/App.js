import { useEffect, useState } from "react"
import axios from "axios"

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//waiting for apikey activate...

const Weather = ({ country }) => {
	console.log('country: ', country);
	const [weatherData, setWeatherData] = useState({
		weather: [{ icon: "01d", main: "", description: "",}],
		main: { temp: 0, pressure: 0, humidity: 0},
		wind: { speed: 0 },

	})
	const key = "" 
	
	const latitude = country.capitalInfo.latlng[0]
	const longitude = country.capitalInfo.latlng[1]
	console.log('lat & long', latitude, longitude);
	
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
	 	
	const iconCode = weatherData.weather[0].icon
	
	const imageLink = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
	
	const temperature = weatherData.main.temp
	const wind = weatherData.wind.speed
	const pressure = weatherData.main.pressure
	const humidity = weatherData.main.humidity
	const main = weatherData.weather[0].main
	const description = weatherData.weather[0].description

	async function fetchHook(url) {
		const eventHandler = (response) => {
			console.log('Hello?',response.data)
			setWeatherData(response.data)
		}
		await axios.get(url).then(eventHandler)
	}

	useEffect(() => {
		fetchHook(url)
	}, [])

	return (
		<>
			<h3>Weather in {country.capital}</h3>
			<div>
				<img 
				style={{background: 'gray', borderRadius: '15px'}}
				src={imageLink} 
				alt="weatherIcon" />
			<p>Temperature {temperature.toFixed(2)} Celsius</p></div>
			<div>Wind {wind} m/s</div>
			<div>
				<p> {main}: {description}</p>
				<p>Pressure: {pressure}</p>
				<p>humidity: {humidity}</p>

			</div>
		</>
	)
}

const Countries = ({ countriesToShow, newSearchCountry, handleClick }) => {
	if (newSearchCountry === "") {
		return <div>Search a Country</div>
	} else {
		if (countriesToShow.length > 10) {
			return <div>Too many matches, specify another filter</div>
		} else {
			if (countriesToShow.length > 1) {
				return (
					<>
						{countriesToShow.map((country, i) => (
							<div key={i}>
								{country.name.common}{" "}
								<button
									onClick={() =>
										handleClick(country.name.common)
									}
								>
									show
								</button>
							</div>
						))}
					</>
				)
			} else {
				if (countriesToShow.length === 1) {
					let latitude = countriesToShow[0].capitalInfo.latlng[0]
					let longitude = countriesToShow[0].capitalInfo.latlng[1]
					let key = "123"
					let units = "metric"
					return (
						<div>
							<h1>{countriesToShow[0].name.common}</h1>
							<div>capital {countriesToShow[0].capital}</div>
							<div>area {countriesToShow[0].area}</div>
							<h3>languages:</h3>
							<ul>
								{Object.values(
									countriesToShow[0].languages
								).map(value => (
									<li key={value}>{value}</li>
								))}
							</ul>
							<img style={{borderRadius: '5%', border: '1px solid black'}}
								alt={countriesToShow[0].flag}
								src={countriesToShow[0].flags.png}
							/>
							<Weather country={countriesToShow[0]} />
						</div>
					)
				} else {
					return <div>0 matches, try another search</div>
				}
			}
		}
	}
}


function App() {
	const [newSearchCountry, setNewSearchCountry] = useState("")
	const [countries, setCountries] = useState([])

	function handleClick(countryName) {
		setNewSearchCountry(countryName)
	}

	const fetchHook = () => {
		const eventHandler = response => {
			setCountries(response.data)
		}
		axios.get("https://restcountries.com/v3.1/all").then(eventHandler)
	}

	const handleSearchCountry = event => {
		setNewSearchCountry(event.target.value)
	}

	useEffect(fetchHook, [])

	const countriesToShow = countries.filter(country =>
		country.name.common
			.toLowerCase()
			.includes(newSearchCountry.toLocaleLowerCase())
	)
console.log('countries: ', countries);
	return (
		<div>
			find countries{" "}
			<input value={newSearchCountry} onChange={handleSearchCountry} />
			<Countries
				countriesToShow={countriesToShow}
				newSearchCountry={newSearchCountry}
				handleClick={handleClick}
			/>
		</div>
	)
}

export default App
