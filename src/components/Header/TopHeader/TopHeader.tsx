import React from 'react';
import Time from './Time';
import Local from './Local';
import classes from './TopHeader.module.css';

interface props {
  weather:string
}

export default function TopHeader({weather}:props) {
  return (
    <div className={classes.TopHeader}>
      <Time weather={weather}/>
      <Local weather={weather}/>
    </div>
  )
}
