import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  const ingredientsJSX = [];

  Object.keys(props.ingredients)
    .forEach(ingredient => {
      for (let i = 0; i < props.ingredients[ingredient]; i++) {
        ingredientsJSX.push(
          <BurgerIngredient key={ingredient + i} type={ingredient} />
        );
      };
    });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {ingredientsJSX.length ? ingredientsJSX : <p>Please start adding ingredients!</p>}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;