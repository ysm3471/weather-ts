import React from 'react';
import classes from './Footer.module.css'
import { useWeatherContext } from '../Store/WeatherProvider';

interface props {
  weather:string
}

export default function Footer({weather}:props) {
  const ctx = useWeatherContext();
  const {settingToggleBtn} = ctx;

  return (
    <footer className={classes.Footer}>
      <div className={`icon ${classes.icon}`} onClick={settingToggleBtn}>
        {weather === "rainy" ? <img src="img/setting_w.png" alt="setting" /> : <img src="img/setting_b.png" alt="setting" />}
      </div>
    </footer>
  )
}
