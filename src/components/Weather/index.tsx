import moment from 'moment';
import { FC, useState } from 'react';
import { WeatherData } from '../../interfaces';
import location from '../../assets/weather/location.svg';

import s from './Weather.module.scss';

const colors = {
  freezing: '#00ffff',
  middle: '#fff700',
  higher: '#ff8c00',

  orange: '#ffb84d',
  yellow: '#ffff99',
  green: '#66ff66',
  aqua: '#80ffff',
  blue: '#33d6ff',
  violet: '#b380ff',
  purple: '#9900cc',
};

type WeatherProps = {
  weatherData: WeatherData;
};
const Weather: FC<WeatherProps> = ({ weatherData }) => {
  console.log('weatherData', weatherData);

  let temp = Math.floor(weatherData.current.temp);
  let feelsLike = Math.floor(weatherData.current.feels_like);
  let description = weatherData.current.weather[0].description;
  let humidity = weatherData.current.humidity;
  let data = moment().format('dddd D MMM');
  // let data = moment().format('dddd D MMM h:mm a');
  let icon = weatherData.current.weather[0].icon;
  let url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const loc = weatherData.timezone;
  const city = loc.split('/');
  console.log(city);

  const [valueTemperature, setValueTemperature] = useState(temp);

  const cardColor = (temp: number) => {
    console.log('temp', temp);

    switch (true) {
      case temp <= -25:
        return colors.purple;
      case temp > -25 && temp <= -15:
        return colors.violet;
      case temp > -15 && temp <= -10:
        return colors.blue;
      case temp > -10 && temp <= 0:
        return colors.freezing;
      case temp > 0 && temp <= 5:
        return colors.aqua;
      case temp > 5 && temp <= 14:
        return colors.green;
      case temp > 14 && temp < 20:
        return colors.yellow;
      case temp > 20 && temp < 25:
        return colors.middle;
      case temp > 25 && temp < 30:
        return colors.orange;
      case temp >= 30:
        return colors.higher;
    }
  };

  return (
    <>
      <div
        className={s.weather__color}
        style={{
          background: `linear-gradient(to top, ${cardColor(
            valueTemperature,
          )}, 30%, white)`,
        }}
      >
        <div className={s.weather__card}>
          <div className={s.weather__timezone}>
            <img
              src={location}
              alt="location icon"
              className={s.weather__locationIcon}
            ></img>
            <span>{city[1]}</span>
          </div>
          <div className={s.weather__data}>{data}</div>
          <div className={s.weather__weatherIcon}>
            <img src={url} alt={description}></img>
          </div>

          <div className={s.weather__temp}>
            {!valueTemperature ? (
              <span>{temp}°</span>
            ) : (
              <span>{valueTemperature}°</span>
            )}
            <span className={s.weather__descr}>{description}</span>
          </div>

          <div>
            feels like
            <span> {feelsLike}</span>
            <span>°</span>
          </div>

          <div className={s.weather__humidity}>humidity {humidity}%</div>
        </div>
      </div>
      <div className={s.sliderBox}>
        <input
          type="range"
          min="-50"
          max="50"
          value={valueTemperature}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValueTemperature(+e.target.value)
          }
        />
      </div>
    </>
  );
};
export default Weather;
