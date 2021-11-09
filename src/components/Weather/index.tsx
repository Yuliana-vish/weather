import { Box, Slider } from '@mui/material';
import moment from 'moment';
import { FC, useState, useEffect } from 'react';
import { WeatherData } from '../../interfaces';

import s from './Weather.module.scss';

type WeatherProps = {
  weatherData: WeatherData;
};

const Weather: FC<WeatherProps> = ({ weatherData }) => {
  console.log('weatherData', weatherData);

  let temp = Math.floor(weatherData.current.temp);
  let fellsLike = Math.floor(weatherData.current.feels_like);
  let description = weatherData.current.weather[0].description;
  let humidity = weatherData.current.humidity;
  let data = moment().format('MMMM Do, h:mm a');
  let icon = weatherData.current.weather[0].icon;
  let url = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const [valueTemperature, setValueTemperature] = useState(temp);

  const colors = {
    freezing: '#00ffff',
    middle: '#fff700',
    higher: '#ff8c00',

    orange: '#ffb84d',
    yellow: '#ffff99',
    green: ' #ccff99',
    aqua: '#b3ffff',
    blue: '#66c2ff',
    violet: '#bf00ff',
  };

  const cardColor = (temp: number) => {
    console.log('temp', temp);

    if (temp <= -10) {
      return colors.violet;
    }
    if (temp > -5 && temp <= 0) {
      return colors.blue;
    }
    if (temp > 0 && temp <= 9) {
      return colors.freezing;
    }
    if (temp > 9 && temp <= 14) {
      return colors.green;
    }
    if (temp > 14 && temp < 24) {
      return colors.yellow;
    }
    if (temp >= 24) {
      return colors.orange;
    }
  };

  // #00ffff for -10 degrees and below
  // #fff700 for +10 degrees
  // #ff8c00 for +30 degrees and above

  return (
    <>
      <div
        className={s.weather__card}
        style={{
          background: `radial-gradient(${cardColor(
            valueTemperature,
          )}, 20%, white)`,
        }}

        // style={{
        //   background: `linear-gradient(to top, ${colors.freezing}, ${colors.middle}, ${colors.higher})`,
        // }}

        // style={{
        //   background: `linear-gradient(90deg, ${colors.freezing} 0%, ${
        //     colors.middle
        //   } ${temp + 50}%, ${colors.higher} 100%)`,
        // }}
      >
        <img src={url} alt={description} width="100" height="100"></img>
        <span>{description}</span>
        <div className={s.weather__temp}>
          {!valueTemperature ? (
            <>
              <span>{temp}</span>
              <span className={s.weather__tempC}>℃</span>
            </>
          ) : (
            <>
              <span>{valueTemperature}</span>
              <span className={s.weather__tempC}>℃</span>
            </>
          )}
        </div>
        <div>Fells like {fellsLike}℃</div>
        <span>Humidity {humidity}%</span>
        <div className={s.weather__timezone}>{weatherData.timezone}</div>
        <span>{data}</span>
      </div>
      <div className={s.weather__sliderBox}>
        <input
          className={s.weather__slider}
          type="range"
          min="-50"
          max="50"
          defaultValue={temp}
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
