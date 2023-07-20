import React from 'react';
import classes from './TempNow.module.css';
import { useWeatherContext } from '../../Store/WeatherProvider';
import type { Data } from '../../Store/WeatherProvider';

export default function TempNow() {
  const ctx = useWeatherContext();
  const {info} = ctx

  const today:Date = new Date();
  let now:number|string = today.getHours();

  if(now <10) {   // 현재 시간을 형식에 맞게 변경
    now = "0" + now + "00"
  }
  else {
    now = now + "00"
  }

  const tempNow:Data | null | undefined = info && info[1].find((aa) => {    // 현재 시간의 기온을 검색
    return aa.category === "TMP" && aa.fcstTime === now
  })

  return (
    <div className={classes.TempNow}>
      {tempNow && <p>{tempNow.fcstValue}°</p>}
    </div>
  )
}
