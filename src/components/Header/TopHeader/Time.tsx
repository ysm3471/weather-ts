import React from 'react';
import classes from './Time.module.css';
import { useWeatherContext } from '../../Store/WeatherProvider';

interface props {
  weather:string
}

export default function Time({weather}:props) {
  const ctx = useWeatherContext();
  const {bgToggle,refreshBtn} = ctx
  let time:JSX.Element; 

  const today:Date = new Date();
  let now:number | string = today.getHours();
  if (now < 10) now = "0" + now   // 시간 형식 변경

  if (weather === 'snow' || !bgToggle) {    // 배경을 끈 상태거나 weather가 snow일 경우의 style
    time = (
      <div className={`${classes.Time} ${classes.snow}`}>
      <div className={`icon ${classes.icon}`} onClick={refreshBtn}>
        <img src="img/refresh_b.png" alt="refresh_b" />
      </div>
      <p>기준 시간 {now}:00</p>
    </div>
    )
  }
  else {
    time = (
      <div className={classes.Time}>
      <div className={`icon ${classes.icon}`} onClick={refreshBtn}>
        <img src="img/refresh_w.png" alt="refresh_w" />
      </div>
      <p>기준 시간 {now}:00</p>
    </div>
    )
  }

  return (
    <>
    {time}
    </>
  )
}
