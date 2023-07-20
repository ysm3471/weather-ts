import React, { useContext, useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import classes from './ForecastList.module.css'
import { WeatherContext, useWeatherContext } from '../../Store/WeatherProvider';
import type { TMNTMX,Data } from '../../Store/WeatherProvider';

interface props {
  TMN:string,
  TMX:string,
  rain:Data[],
  date:string
}

export default function ForecastList({ date, TMN, TMX, rain }:props) {
  const ctx = useWeatherContext();
  const { howPer, info,rain:rainState } = ctx
  const [page, setPage] = useState<number>(1);

  const dayRain:Data[] = rain.filter((aa) => {    // 오전의 강수확률 저장 (18시 이전)
    return Number(aa.fcstTime) < 1800
  })
  const nightRain:Data[] = rain.filter((aa) => {   // 오후의 강수확률 저장 (18시 이후)
    return Number(aa.fcstTime) >= 1800
  })

  const day = dayRain.find((aa) => Number(aa.fcstValue) >= howPer)    // 지정한 강수확률 이상의 값이 오전에 있는지
  const night = nightRain.find((aa) => Number(aa.fcstValue) >= howPer)  // 지정한 강수확률 이상의 값이 오후에 있는지
  let dayWeather = useRef<string>('normal')   // 오전 날씨의 기본값 지정
  let nightWeather = useRef<string>('normal') // 오후 날씨의 기본값 지정
  
  useEffect(() => {
    if (day) {
      let dayHow:Data | null | undefined =info && info[page].find((aa) => aa.fcstTime === day.fcstTime && aa.category === "PTY");   // 오전에 비가 내린다면 강수형태가 어떤지
      if (!dayHow) setPage(num => num + 1)        // 지정한 페이지에 없다면 다음 페이지로 이동
      
      if(dayHow && dayHow.fcstValue === "3") dayWeather.current = 'snow'    // 내리는 형태 체크
      else dayWeather.current = 'rainy'  
    }
    else  dayWeather.current = 'normal'
  }, [page,rainState])

  useEffect(() => {
    if (night) {
      let nightHow:Data | null | undefined =info && info[page].find((aa) => aa.fcstTime === night.fcstTime && aa.category === "PTY");
      if (!nightHow) setPage(num => num + 1)        

      if(nightHow && nightHow.fcstValue === "3") nightWeather.current = 'snow'
      else nightWeather.current = 'rainy'  
    }
    else nightWeather.current = 'normal'
  },[page,rainState])


  return (
    <li className={classes.ForecastList}>
      <div className={classes.date}>{date}</div>
      <div>낮<Icon weather={dayWeather.current} /></div>
      <div>밤<Icon weather={nightWeather.current} /></div>
      <p>{TMX}°/{TMN}°</p>
    </li>
  )
}
