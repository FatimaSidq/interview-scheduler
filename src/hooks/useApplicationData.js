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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments });
    });
  }

  function cancelInterview(id) {
    for (let appointment of Object.values(state.appointments)) {
      if (appointment.id === id) {
        appointment.interview = null;
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        return axios.delete(`/api/appointments/${id}`).then(() => {
          setState({ ...state, appointments });
        });
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

  useEffect(() => {
    const modifiedDays = state.days;
    for (let i = 0; i < modifiedDays.length; i++) {
      if (modifiedDays[i].name === state.day) {
        let counter = modifiedDays[i].appointments.length;

        for (let appointment of modifiedDays[i].appointments) {
          if (state.appointments[appointment].interview) {
            counter -= 1;
          }
        }

        modifiedDays[i].spots = counter;
        setState(state => ({ ...state, days: modifiedDays }));
      }
    }
  }, [state.appointments]);

  return {
    state,
    setDay: (day) => setState({ ...state, day }),
    bookInterview,
    cancelInterview,
  };
}
