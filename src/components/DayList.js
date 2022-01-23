import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  let days = [];
  for (let day of props.days) {
    days.push( <DayListItem
      key={props.id} 
      name={props.name} 
      spots={props.spots} 
      selected={props.name === props.value}
      setDay={props.onChange}
     />)
  }
  return (
    <ul>
      {days}
    </ul>
  )
}