import Form from './Form'
import '../styles/Page.css'
import axios from 'axios';


function Page() {

const onSubmit = async location => {
        try {
            const resp = await axios({
                method: 'GET',
                url: 'https://community-open-weather-map.p.rapidapi.com/weather',
                params: {
                  q: location,
                },
                headers: {
                  'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                  'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
                }
            })
            console.log(resp.data)
        } catch(err) {
            console.log(err)
        }
}

  return (
        <div className="page__container">
            <div className='page__header'>Weather App</div>
            <Form submitSearch={onSubmit} />
        </div>
  )
}

export default Page;
