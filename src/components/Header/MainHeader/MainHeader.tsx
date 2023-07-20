import React from 'react';
import classes from './MainHeader.module.css';
import TempNow from './TempNow';
import RainCheck from './RainCheck';
import TempHighLow from './TempHighLow';
import type { rainProps } from '../Header';


export default function MainHeader({weather,isRainy}:rainProps) {
  return (
    <div className={classes.MainHeader}>
      <TempNow/>
      <RainCheck weather={weather} isRainy={isRainy}/>
      <TempHighLow weather={weather}/>
    </div>
  )
}
