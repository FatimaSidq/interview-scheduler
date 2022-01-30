import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

function InterviewerList(props) {
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
