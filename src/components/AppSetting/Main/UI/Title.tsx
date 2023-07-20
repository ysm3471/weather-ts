import React from 'react';
import classes from './Title.module.css'

interface props {
  title:string
}

export default function Title({title}:props) {
  return (
    <div className={classes.Title}>{title}</div>
  )
}
