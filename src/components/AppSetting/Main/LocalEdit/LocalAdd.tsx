import React from 'react';
import classes from './LocalAdd.module.css';

interface props {
  mapToggleBtn:()=>void;
}

export default function LocalAdd({mapToggleBtn}:props) {
  return (
    <div className={classes.LocalAdd}>
      <div className="icon" onClick={mapToggleBtn}>
        <img src="img/add.png" alt="add" />
      </div>
    </div>
  )
}
