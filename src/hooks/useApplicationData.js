import { useEffect, useState } from "react";
import "components/Application.scss";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function updateSpots(deleteMode = false) {
    for (let stateDay of state.days) {
      if (stateDay.name === state.day) {
        let counter = deleteMode
          ? stateDay.appointments.length
          : stateDay.appointments.length - 1;
        for (let appointment of stateDay.appointments) {
          if (state.appointments[appointment].interview) {
            counter -= 1;
          }
        }
        stateDay.spots = counter;
      }
    }
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({ ...state, appointments });
    updateSpots();
  }

  function cancelInterview(id) {
    for (let appointment of Object.values(state.appointments)) {
      if (appointment.id === id) {
        appointment.interview = null;
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        setState({ ...state, appointments });
        updateSpots(true);
        return;
      }
    }
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay: (day) => setState({ ...state, day }),
    bookInterview,
    cancelInterview,
  };
}
