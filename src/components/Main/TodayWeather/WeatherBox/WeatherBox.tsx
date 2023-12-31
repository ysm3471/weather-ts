import React from 'react';
import classes from './WeatherBox.module.css'
import Icon from '../../Icon';
import { useWeatherContext } from '../../../Store/WeatherProvider';
import type { Data } from '../../../Store/WeatherProvider';

interface props {
  time:number,
  date:string
}

export default function WeatherBox({ time,date }:props) {
  const ctx = useWeatherContext();
  const { info,howPer } = ctx;
  let weather:string = "normal";   // 지정한 시간의 날씨 정보를 저장하는 변수
  let num:number = 1;    // 페이지 정보를 저장하는 변수

  let tmpTime:number | string = time;    // props의 날짜정보를 변수에 저장

  if (tmpTime < 10) {   // 날짜정보를 형식에 맞게 변경
    tmpTime = "0" + tmpTime + "00"
  }
  else {
    tmpTime = tmpTime + "00"
  }


  let tmp:Data | undefined | null =info && info[num].find((aa) => {    // 지정한 시간의 온도를 검색
    return aa.category === "TMP" && aa.fcstTime === tmpTime && aa.fcstDate === date
  })
  let rainPer:Data | undefined | null =info && info[num].find((aa) => {  // 지정한 시간의 강수량을 검색
    return aa.category === "POP" && aa.fcstTime === tmpTime && aa.fcstDate === date
  })
  if (!(tmp)) {    // 1페이지에 없으면(내일 새벽 2시 이후의 시간이면) 다음 페이지에서 찾음
    num++;
    tmp =info && info[num].find((aa) => {
      return aa.category === "TMP" && aa.fcstTime === tmpTime && aa.fcstDate === date
    })
    rainPer =info && info[num].find((aa) => {
      return aa.category === "POP" && aa.fcstTime === tmpTime && aa.fcstDate === date
    })
  }
  if (rainPer) {
    if(Number(rainPer.fcstValue) >= Number(howPer)) {   // 지정한 시간의 강수량이 사용자가 지정한 강수량 이상일 경우
      const how:Data | undefined | null = info && info[num].find((aa) => {    // 검색한 값의 시간에 내리는게 눈인지 비인지 확인
        if(rainPer)  return  rainPer.fcstTime === aa.fcstTime && aa.category === "PTY" && aa.fcstDate === date
      })
      if (how && how.fcstValue === "3") weather = "snow"
      else weather = "rainy"
    }    
  }

  return (
    <div className="swiper-slide">
      <div className={classes.WeatherBox}>
        <h3>{time === 0 ? 24 : time}시</h3>
        <Icon weather={weather} />  {/* 지정한 시간의 날씨 정보를 컴포넌트에 전달 */}
        {tmp && <p className={classes.temp}>{tmp.fcstValue}°</p>}
        {rainPer && <p className={Number(rainPer.fcstValue) >= Number(howPer) ? classes.rainPer : classes.noRain}>{rainPer.fcstValue}%</p>} {/* 지정한 시간의 강수량에 따라 style을 변경 */}
      </div>      
    </div>
  )
}
