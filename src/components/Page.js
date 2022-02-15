import Form from './Form'
import Forecast from './Forecast'
import '../styles/Page.css'
import axios from 'axios';
import { useState } from 'react'
import getCurrentForecast from '../helpers.js/getCurrentForecast';
import getCurrentForecastDetails from '../helpers.js/getCurrentForecastDetails';
import getUpcomingForecast from '../helpers.js/getUpcomingForecast';

const BASEURL = "https://community-open-weather-map.p.rapidapi.com"

function Page() {

const [error, setError] = useState(false)
const [showForm, setShowForm] = useState(true)
const [errorMessage, setErrorMessage] = useState('')
const [forecast, setForecast] = useState(null)

const onSubmit = async location => {
        const { data } = await axios({
            method: 'GET',
            url: `${BASEURL}/weather`,
            params: {
                q: location,
                units: 'imperial'
            },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        })

        if (!data || data.length === 0) {
            setErrorMessage("Location was not found...")
            return;
        }
        
        const response = await axios({
            method: 'GET',
            url: `${BASEURL}/forecast/daily`,
            params: {
                id: data.id,
                units: 'imperial'
            },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        })

        if (!response.data || response.data.length === 0) {
            setErrorMessage("No additional forecast found for this location..")
            return;
        }

        const currentForecast = getCurrentForecast(data.main.temp, data.name, data.dt, data.weather[0]);
        const currentForecastDetails = getCurrentForecastDetails(data.main, data.wind)
        const upcomingForecast = getUpcomingForecast(response.data.list)

        setForecast({ currentForecast, currentForecastDetails, upcomingForecast })
}

  return (
        <div className="page__container">
            <div className='page__header'>Weather App</div>
            <Form submitSearch={onSubmit} />
            {forecast && <Forecast forecast={forecast} /> }
            <div className='page__errorMessage'>{errorMessage}</div>
        </div>
  )
}

export default Page;
