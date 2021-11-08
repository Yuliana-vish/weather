import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import Weather from '../../components/Weather';
import { WeatherData } from '../../interfaces';
import s from './MainPage.module.scss';

const MainPage: FC = () => {
  const URL = `https://api.openweathermap.org/data/2.5/onecall`;
  const API_KEY = `b7d55f8a0402dab6e56b6a6e89b0c97d`;

  // const dispatch = useDispatch();
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [data, setData] = useState<WeatherData>();

  // const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position: any) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });

      axios
        .get(
          `${URL}?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`,
        )
        .then(res => res.data)
        .then(result => {
          setData(result);
          // console.log('result', result);
        });
    };
    // console.log('Latitude is:', lat);
    // console.log('Longitude is:', long);
    fetchData();
    // console.log('data', data);
  }, [lat, lon]);

  return (
    // const weatherData=data

    <div className={s.main__page}>
      {!data ? (
        <div>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        // <Weather weatherData={data} />
        <div className={s.weather__container}>
          <Weather weatherData={data} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
