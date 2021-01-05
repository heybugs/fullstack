export const Content = ({ cityItem, curWeather }) => {
  return (
    <div>
      <h2>{cityItem.name}</h2>
      <p>{'capital :' + cityItem.capital}</p>
      <p>{'population :' + cityItem.population}</p>
      <p>speak languages:</p>
      <ul>
        {cityItem.languages.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul>
      <img style={{ width: 100 }} alt="flag" src={cityItem.flag} />
      <p>weather in {cityItem.name}</p>
      <p>temperature:{curWeather.temperature}</p>
      <img
        style={{ width: 100 }}
        alt="weather_icons"
        src={curWeather.weather_icons}
      />
      <p>
        wind:{curWeather.wind_speed} mph direction {curWeather.wind_dir}
      </p>
    </div>
  );
};
