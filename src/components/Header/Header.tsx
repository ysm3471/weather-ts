import React from 'react';
import classes from './Header.module.css';
import { Data, useWeatherContext } from '../Store/WeatherProvider';
import TopHeader from './TopHeader/TopHeader';
import MainHeader from './MainHeader/MainHeader';

export type rainProps =  {   // props의 type을 세팅하는 방법
  weather:string,
  isRainy:Data | undefined | null
}

export default function Header({weather,isRainy}:rainProps) {
  const ctx = useWeatherContext();
  const {bgToggle} = ctx;

  return (
    <header className={classes.Header} style={bgToggle ? undefined : {color:'var(--deep_b)'}}>
      <TopHeader weather={weather}/>
      <MainHeader weather={weather} isRainy={isRainy}/>
    </header>
  )
}
