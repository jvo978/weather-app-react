import '../styles/UpcomingForecast.css'

function UpcomingForecast({ upcomingDetails }) {
  return (
    <div className="upcoming__container">
      <div className='upcoming__top'>
        Next Five Days
      </div>
      <div className='upcoming__bottom'>
        {upcomingDetails.map((detail, id) => {
            return (
            <div key={id} className="upcoming__details">
                <div>{detail.day}</div>
                <div><img alt="icon" src={detail.icon}/></div>
                <div>{detail.temp}°F</div>
            </div>
            )
        })}
      </div>
    </div>
  )
}

export default UpcomingForecast