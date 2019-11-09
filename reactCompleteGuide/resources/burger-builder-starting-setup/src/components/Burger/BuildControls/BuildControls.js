import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const CONTROLS = [
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"}
];

const buildControls = props => {
  const controlsJSX = CONTROLS.map(control => {
    return (
      <BuildControl
        key={control.label}
        label={control.label}
        added={props.addIngredient.bind(this, control.type)}
        removed={props.removeIngredient.bind(this, control.type)}
        disabled={props.disabledInfo[control.type]}
      />
    );
  });

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>

      {controlsJSX}

      <button
        className={classes.OrderButton}
        onClick={props.toggleSummary}
        disabled={!props.purchasable}
      >
        Order Now
      </button>
    </div>
  );
};

export default buildControls;