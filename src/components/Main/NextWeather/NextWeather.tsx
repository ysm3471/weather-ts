import React from 'react';
import classes from './NextWeather.module.css';
import ForecastList from './ForecastList';
import { useWeatherContext } from '../../Store/WeatherProvider';

export default function NextWeather() {
  const ctx = useWeatherContext();
  const {TMN,TMX,rain} = ctx

  if(TMX && TMN && rain) {
    return (
      <div className={classes.NextWeather}>
        <ul>
          <ForecastList date={"오늘"} TMN={TMN[1]} TMX={TMX[1]} rain={rain[1]}/>
          <ForecastList date={"내일"} TMN={TMN[2]} TMX={TMX[2]} rain={rain[2]}/>
          <ForecastList date={"모래"} TMN={TMN[3]} TMX={TMX[3]} rain={rain[3]}/>
        </ul>
      </div>
    )    
  }
  else return <></>   // return값을 JSX.Element로 통일시키기 위해서
}
