import React from 'react';
import classes from './RainCheck.module.css';
import { useWeatherContext } from '../../Store/WeatherProvider';
import type { rainProps } from '../Header';



export default function RainCheck({weather,isRainy}:rainProps) {
  const ctx = useWeatherContext();
  const {bgToggle} = ctx;

  let todayWeather:string = "비 예보 없음";
  let todayColor:string|null = null;

  let rainyTime:string|null = null;
  if (isRainy) {    // 금일 비가 내린다면 내리는 시간을 저장
    rainyTime = isRainy.fcstTime.replace(/0/g,'')   // 문자열에서 0을 제거하는 정규표현식 <- 20시 10시의 경우 뒤의 00까지 짤려버리는 문제 발생
  }
  
  switch (weather) {    // 날씨에 따라서 style을 변경
    case "normal":
      todayWeather = "비 예보 없음";
      break;
    case "rainy":
      todayWeather = "비";
      todayColor = classes.rainy;
      break;
    case "snow":
      todayWeather = "눈";
      todayColor = classes.snow;
      break;
    default:
      break;
  }

  let rainCheck:JSX.Element;

  if(weather === "normal") {
    rainCheck = (
    <div className={classes.RainCheck} style={bgToggle ? undefined : {color:'var(--light_red)'}}>
      비 예보 없음
    </div>      
    )
  }
  else {
    rainCheck = (
      <div className={`${classes.RainCheck} ${todayColor}`}>
        <span>{rainyTime}시</span>
        부터
        <b> {todayWeather}</b>
      </div>        
    )
  }
  return (
    <>  
    {/* 안 감싸면 혼자서는 존재할 수 없음 */}
    {rainCheck}
    </>
  )
}
