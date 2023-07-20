import React, { Dispatch, SetStateAction } from 'react';
import BgControl from './BgControl/BgControl';
import LocalEdit from './LocalEdit/LocalEdit';
import RainCheck from './RainCheck/RainCheck';
import DevControl from './DevControl/DevControl';
import classes from './Main.module.css';

export type settingProps = {
  mapToggleBtn:()=>void,
  userEditing:Dispatch<SetStateAction<boolean>>,
  editing:boolean
}

export default function Main({mapToggleBtn,userEditing,editing}:settingProps) {
  return (
    <main className={classes.main}>
      <LocalEdit mapToggleBtn={mapToggleBtn} editing={editing} userEditing={userEditing}/>
      <BgControl/>
      <RainCheck/>
      <DevControl/>
    </main>
  )
}
