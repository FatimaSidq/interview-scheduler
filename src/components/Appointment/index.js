import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";

export default function Appointment(props) {
  return (
    <>
    <Header time={props.time}>
    </Header>
    {props.interview && <Show/>}
    {!props.interview && <Empty/>}
    </>
  )
}