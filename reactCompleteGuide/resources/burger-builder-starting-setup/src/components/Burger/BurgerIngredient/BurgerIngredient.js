import React from "react";
import classes from "./BurgerIngredient.css";
import PropTypes from "prop-types";

const burgerIngredient = props => {
  let ingredient;

  switch (props.type) {
    case ("bread-bottom"):
      ingredient = (
        <div className={classes.BreadBottom}></div>
      );
      break;
    case ("bread-top"):
      ingredient = (
        <div className={classes.breadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case ("meat"):
      ingredient = (
        <div className={classes.Meat}></div>
      );
      break;
    case ("cheese"):
      ingredient = (
        <div className={classes.Cheese}></div>
      );
      break;
    case ("salad"):
      ingredient = (
        <div className={classes.Salad}></div>
      );
      break;
    case ("bacon"):
      ingredient = (
        <div className={classes.Bacon}></div>
      );
      break;
  };

  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;