import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = [];
  for (let interviewer of props.interviewers) {
    interviewers.push(
      <li>
        <InterviewerListItem
          selected={interviewer.id === props.value}
          setInterviewer={() => {
            props.onChange(interviewer.id);
          }}
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
        ></InterviewerListItem>
      </li>
    );
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
