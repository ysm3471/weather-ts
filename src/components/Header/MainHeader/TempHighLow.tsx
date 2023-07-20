import React from 'react';
import classes from './TempHighLow.module.css';
import { useWeatherContext } from '../../Store/WeatherProvider';

interface props {
  weather:string
}

export default function TempHighLow({weather}:props) {
  const ctx = useWeatherContext();
  const {TMX,TMN} = ctx

  return (
    <div className={classes.TempHighLow}>
      {TMX && TMN && <p className={weather === 'snow' ? classes.snow:undefined}>최고:{TMX[1]}°  최저:{TMN[1]}°</p> }
    </div>
  )
}
