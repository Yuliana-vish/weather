import moment from 'moment';
import { FC } from 'react';
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

  // const cardColor = () => {
  //   switch (expression) {
  //     case constant - expression1: {
  //       //statements;
  //       break;
  //     }
  //     case constant_expression2: {
  //       //statements;
  //       break;
  //     }
  //     default: {
  //       //statements;
  //       break;
  //     }
  //   }
  // };

  // #00ffff for -10 degrees and below
  // #fff700 for +10 degrees
  // #ff8c00 for +30 degrees and above

  return (
    <>
      <div className={s.weather__card}>
        <img src={url} alt={description} width="100" height="100"></img>
        <span>{description}</span>
        <div className={s.weather__temp}>
          <span>{temp}</span>
          <span className={s.weather__tempC}>℃</span>
        </div>
        <div>Fells like {fellsLike}℃</div>
        <span>Humidity {humidity}%</span>
        <div className={s.weather__timezone}>{weatherData.timezone}</div>
        <span>{data}</span>
      </div>
    </>
  );
};
export default Weather;
