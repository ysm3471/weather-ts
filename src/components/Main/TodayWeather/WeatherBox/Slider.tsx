import React from "react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import WeatherBox from "./WeatherBox";
import DateInfo from "../../../Store/DateInfo";
import { SwiperOptions } from "swiper/types/swiper-options";
import Swiper from "swiper";

const swiperParams: SwiperOptions = {
  slidesPerView: 4.5,
  spaceBetween: 0
};

export default function Slider() {
  const today:Date = new Date();   // 금일 날짜
  const now:number = today.getHours();
  const todayDate:string = DateInfo(today);

  let changeDate:Date= new Date(today.setDate(today.getDate() + 1)); // 내일 날짜
  let nextDate:string = DateInfo(changeDate);

  let arr:number[] = [];   // 시간을 저장하는 배열
  let day:string[] = [];   // 시간에 해당하는 날짜를 저장하는 배열

  for(let i=now;i<now+16;i++) { // 현재 시간에서 16시간 이후까지 표시함
    if (i<24) {  
      arr.push(i);
      day.push(todayDate);    
    }
    else {    // 24시 이후라면 0부터 시작
      arr.push(i-24);
      day.push(nextDate);
    }
  }
  const weatherBoxes:JSX.Element[] = arr.map((aa,index) => {    // 시간과 해당하는 날짜를 props로 전달
    return <WeatherBox time={aa} date={day[index]} key={index}/>
  })

  const swiper = new Swiper('.swiper', swiperParams);

  return (
    <>
  <div className="swiper mySwiper">
    <div className="swiper-wrapper">
      {weatherBoxes}
    </div>
  </div>
    </>
  );
}
