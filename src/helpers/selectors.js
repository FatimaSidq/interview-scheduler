export function getAppointmentsForDay(state, day) {
  let result = [];

  for (let stateDay of state.days) {
    if (stateDay.name === day) {
      for (let appointment of stateDay.appointments) {
        result.push(state.appointments[appointment]);
      }
    }
  }

  return result;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  let result = [];

  for (let stateDay of Object.values(state.days)) {
    if (stateDay.name === day) {
      for (let stateInterviewer of stateDay.interviewers) {
        result.push(state.interviewers[stateInterviewer]);
      }
    }
  }

  return result;
}
