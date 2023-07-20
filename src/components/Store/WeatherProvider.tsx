import React, { createContext, useContext, useState, useEffect, useRef,Dispatch,SetStateAction } from 'react';
import DateInfo from './DateInfo';
import GetInfo from './GetInfo';
import Loading from './Loading';
import LocationConverter from './LocationConverter';
import type {rs} from './LocationConverter'

type WeatherProviderProps = {   // children을 props로 사용할 때 type을 지정하는 방법
  children:React.ReactNode
}
export type Data = {
  baseDate:string,      // string과 String은 다름. String은 PRIMITIVE TYPE(실제 값을 저장하는 자료형), string은 참조 자료형
  baseTime:string,
  category:string,
  fcstDate:string,
  fcstTime:string,
  fcstValue:string,
  nx:string,
  ny:string
}
interface Datas {
  [key:number]:Data[]   // 지정되지 않은 key값이 있을 때, 중첩된 객체를 사용할 때
}
export type TMNTMX = {
  [key:number]:string
}
export type AddressList = {
  id:number,
  address:string,
  selected:boolean,    // 북마크 표시를 위한 요소
  Ma:number,    // 위도
  La:number,    // 경도
}
export type Location = {
  La:number,
  Ma:number
}

export type ctxType = {   // context의 value로 전달할 값들을 type으로 지정해놓음
  changeWeather:string,
  setChangeWeather:Dispatch<SetStateAction<string>>,
  bgToggle:boolean,
  bgToggleBtn:() => void,
  settingToggle:boolean,
  settingToggleBtn:() => void,
  setInfo:Dispatch<SetStateAction<null|Datas>>,
  info:Datas | null,
  TMN:TMNTMX | null,
  TMX:TMNTMX | null,
  rain:Datas | null,
  setRain:Dispatch<SetStateAction<Datas | null>>,
  howPer:number,
  setHowPer:Dispatch<SetStateAction<number>>,
  refreshBtn:() => void,
  userAddress:boolean | string,
  setUserAddress:Dispatch<SetStateAction<boolean | string>>,
  userLocation:Location | null,
  setUserLoaction:Dispatch<SetStateAction<null | Location>>,
  convertLoaction:rs,
  userAddressList:AddressList[], 
  setUserAddressList:Dispatch<SetStateAction<AddressList[]>>
}
export const WeatherContext = createContext<ctxType | null>(null);

export default function WeatherProvider({children}:WeatherProviderProps) {
  let today:Date = new Date();
  const todayDate:string = DateInfo(today);    // 날짜정보를 지정한 형식으로 변환시켜주는 함수

  const [info, setInfo] = useState<Datas | null>(null);   // 불러온 정보를 저장하는 배열
  const [on, setOn] = useState<boolean>(false);    // api의 호출 완료를 표시하는 state
  const [ready, getReady] = useState<boolean>(false);    // api 처리의 완료를 표시하는 state
  const [number, setNumber] = useState<number>(1);    // api의 페이지넘버
  const [howPer, setHowPer] = useState<number>(50);   // 사용자가 설정한 강수량을 표시하는 state


  useEffect(() => {
    setOn(false)    
    GetInfo(todayDate, number,convertLoaction.x,convertLoaction.y)    // 오늘 날짜와 페이지넘버, 가공된 x,y좌표를 변수로 받음
      .then(res => {
        if (number < 4) {   // 3페이지까지 저장
          setInfo({ ...info, [number]: res.response.body.items.item });
          setNumber(num => num + 1)
        }
        else {    // 3페이지까지 저장했다면 준비완료
          setOn(true);
        }
      })
      .catch(error => {
        setNumber(1);
        console.log(error,"에러가 발생했습니다")})
  }, [number])

  let changeDate = useRef<Date>(new Date());    // 바뀌는 날짜를 저장하는 변수
  let date = useRef<string>(DateInfo(changeDate.current));    // 바뀐 날짜를 가공해서 저장하는 변수
  const [num, setNum] = useState<number>(1);    // api 처리를 위한 state
  const [page, setPage] = useState<number>(1);    // api 처리를 위한 state
  const [TMN, setTMN] = useState<TMNTMX | null>(null);   // 최고기온을 저장하는 state
  const [TMX, setTMX] = useState<TMNTMX | null>(null);   // 최저기온을 저장하는 state
  const [rain, setRain] = useState<Datas | null>(null);   // 강수확률을 저장하는 state

  let rainList = useRef<any[]>([]);    // 강수확률을 임시저장하는 배열


  useEffect(() => {
    getReady(false)
    if (on && info) {
      let TMNres = info[page].find((aa) => { return aa.fcstDate === date.current && aa.category === "TMN" })    // 각 페이지의 TMN을 저장
      let TMXres = info[page].find((aa) => { return aa.fcstDate === date.current && aa.category === "TMX" })    // 각 페이지의 TMX를 저장
      let rainres = info[page].filter((aa) => { return aa.fcstDate === date.current && aa.category === "POP" })   // 각 페이지의 강수확률을 배열로 저장

      if (rainres[rainres.length - 1].fcstTime === "2300") {    // 찾은 결과의 마지막요소가 fcstTime이 23시일경우
        for (let key in rainres) {    // 임시 저장소에 병합 후 저장함
          rainList.current.push(rainres[key])
        }
        setRain({ ...rain, [num]: rainList.current })
        rainList.current = [];    // 임시 저장소 초기화
      }
      else {    // 23시가 아닐경우
        for (let key in rainres) {
          rainList.current.push(rainres[key])   // 임시저장소에 저장함
        }
      }

      if(TMXres !== undefined && TMNres !== undefined) {
          setTMN({ ...TMN, [num]: TMNres.fcstValue })   
          setTMX({ ...TMX, [num]: TMXres.fcstValue })
          if (num < 3) {    // 3회 반복을 위한 조건문
            changeDate.current = new Date(changeDate.current.setDate(changeDate.current.getDate() + 1));    // 저장할 때 마다 날짜를 1 증가시킴
            date.current = DateInfo(changeDate.current);
            setNum(num => num + 1)
          }
          else {
            getReady(true)    // num이 3일 경우 렌더링을 시작함
          }
      }
      else if(TMXres === undefined && TMNres !== undefined) {
          setTMN({ ...TMN, [num]: TMNres.fcstValue });
          setPage(num => num + 1);    // page만 넘김
      }
      else if(TMNres === undefined && TMXres !== undefined) {
          setTMN({ ...TMX, [num]: TMXres.fcstValue })
          setPage(num => num + 1)
      }
      else {
          if (page < 3) {
            setPage(num => num + 1);
          }
      }
      
    }
  }, [num, page, on])



  const [bgToggle, setbgToggle] = useState<boolean>(true);   // 배경 스위치
  const [settingToggle, setSettingToggle] = useState<boolean>(false);    // 환경설정 스위치
  const [changeWeather, setChangeWeather] = useState<string>("default");    // 개발자툴
  const [userAddress, setUserAddress] = useState<boolean | string>(false);    // 유저가 지도에서 선택한 주소
  const [userAddressList, setUserAddressList] = useState<AddressList[]>([    //  유저의 주소 및 위치정보를 저장하는 배열
    {
      id: 0,
      address: "서울특별시, 중구",
      selected:true,  
      Ma:37.5620769169639, 
      La:126.984901336292,  
    }
  ])
  const [userLocation, setUserLoaction] = useState<null | Location>(null);   // 유저가 지도에서 선택한 좌표값
  const [convertLoaction,setConvertLocation] = useState<rs>({   // 선택 지역의 좌표값
    x:60,
    y:127,
    lat:0,
    lng:0
  });    

  useEffect(() => {
    if (userAddressList) {    // userAddressList가 변경될 때마다 selected가 true인 요소의 좌표값을 변환시킴
      const searchList = userAddressList.find((aa) => aa.selected)
      if(searchList) {
        const loaction:rs = LocationConverter(searchList.Ma, searchList.La)    // 좌표값을 받으면 격자좌표로 변환시켜주는 함수
        setConvertLocation(loaction); 
      }
    }
  }, [userAddressList])  

  function bgToggleBtn() { 
    setbgToggle((show) => !show)
  }
  function settingToggleBtn() {
    setSettingToggle((show) => !show)
  }
  function refreshBtn() {   // 새로고침 버튼을 누르면 페이지넘버 초기화
    setNumber(1);
  }

  return (
    <>
      {!(ready) && <Loading />}
      {ready && <WeatherContext.Provider
        value={{
          changeWeather,
          setChangeWeather,
          bgToggle,
          bgToggleBtn,
          settingToggle,
          settingToggleBtn,
          setInfo,
          info,
          TMN,
          TMX,
          rain,
          setRain,
          howPer,
          setHowPer,
          refreshBtn,
          userAddress,
          setUserAddress,
          userLocation,
          setUserLoaction,
          convertLoaction,
          userAddressList, 
          setUserAddressList
        }}>
        {children}
      </WeatherContext.Provider>}
    </>
  )
}

export function useWeatherContext() {   // useContext를 사용하면서 유효성 검사도 처리하는 함수를 export시킴
  const ctx = useContext(WeatherContext);
  if(!ctx) throw new Error('Cannot find Context');
  return ctx
}