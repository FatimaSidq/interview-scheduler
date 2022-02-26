import useVisualMode from "hooks/useVisualMode";
import React from "react";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function destroy(event) {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE);
      });
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE);
      });
  }

  return (
    <>
      <Header time={props.time}></Header>
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="DELETE" />}
      {mode === EMPTY && props.time !== "5pm" && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM, true);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        ></Form>
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        ></Form>
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={destroy}
          onCancel={back}
        ></Confirm>
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Saving failed."
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="Delete failed."
          onClose={back}
        />
      )}
    </>
  );
}
