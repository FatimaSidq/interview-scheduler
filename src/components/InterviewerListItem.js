import classNames from "classnames";
import React from "react";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  return (
    <li
      className={classNames("interviewers__item", {
        "interviewers__item--selected": props.selected,
      })}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && <>Sylvia Palmer</>}
    </li>
  );
}
