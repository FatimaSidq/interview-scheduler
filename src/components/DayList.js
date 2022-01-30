import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  let days = [];
  for (let day of props.days) {
    days.push(
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  }
  return <ul>{days}</ul>;
}
