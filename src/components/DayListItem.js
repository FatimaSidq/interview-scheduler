import classNames from "classnames";
import React from "react";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  return (
    <li onClick={() => props.setDay(props.name)} className={classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0})}>
      <h2 className="text--regular">{props.name}</h2>
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
      {props.spots !== 1 && props.spots !== 0 && <h3 className="text--light">{props.spots} spots remaining</h3>}
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
    </li>
  );
}
