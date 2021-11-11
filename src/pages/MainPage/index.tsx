import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import Weather from '../../components/Weather';
import { WeatherData } from '../../interfaces';

import s from './MainPage.module.scss';

const MainPage: FC = () => {
  const URL = `https://api.openweathermap.org/data/2.5/onecall`;
  const API_KEY = `b7d55f8a0402dab6e56b6a6e89b0c97d`;

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [data, setData] = useState<WeatherData>();

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
        });
    };
    fetchData();
  }, [lat, lon]);

  return (
       <div className={s.mainPage}>
      {!data ? (
        <div className={s.loader}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      ) : (
        <div className={s.weather__container}>
          <Weather weatherData={data} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
