import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = [];
  for (let interviewer of props.interviewers) {
    interviewers.push(
        <InterviewerListItem
          key={interviewer.id}
          selected={interviewer.id === props.value}
          setInterviewer={() => {
            props.onChange(interviewer.id);
          }}
          name={interviewer.name}
          avatar={interviewer.avatar}
        ></InterviewerListItem>
    );
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
