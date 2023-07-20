import React, { useEffect, useRef } from 'react';
import classes from './Local.module.css';
import { useWeatherContext } from '../../Store/WeatherProvider';
import type { AddressList } from '../../Store/WeatherProvider';

interface props {
  weather:string
}

export default function Local({ weather }:props) {
  const ctx = useWeatherContext();
  const { bgToggle, settingToggleBtn, userAddressList } = ctx;
  let localName= useRef<string>("서울특별시, 중구");   // 기본 지역

  useEffect(() => {
    const selectedAddress:AddressList | undefined = userAddressList.find((aa) => aa.selected)   // 북마크한 주소정보를 검색
    if(selectedAddress) {
      localName.current = selectedAddress.address.replace(/[0-9]/g, "")    // 주소에서 숫자 제거
      localName.current = localName.current.replace(/-/g, "")    // 주소에서 "-" 제거   
    }
  }, [userAddressList])

  let local:JSX.Element;

  if (weather === 'snow' || !bgToggle) {    // 배경을 끈 상태거나 weather가 snow일 경우의 style
    local = (
      <div className={`${classes.Local} ${classes.snow}`}>
        <div className={`icon ${classes.gps}`}>
          <img src="img/gps_b.png" alt="gps_b" />
        </div>
        <p>{localName.current}</p>
        <div className={`icon ${classes.edit}`} onClick={settingToggleBtn}>
          <img src="img/edit_b.png" alt="edit_b" />
        </div>
      </div>
    )
  }
  else {
    local = (
      <div className={classes.Local}>
        <div className={`icon ${classes.gps}`}>
          <img src="img/gps_w.png" alt="gps_w" />
        </div>
        <p>{localName.current}</p>
        <div className={`icon ${classes.edit}`} onClick={settingToggleBtn}>
          <img src="img/edit_w.png" alt="edit_w" />
        </div>
      </div>
    )
  }

  return (
    <>
      {local}
    </>
  )
}
