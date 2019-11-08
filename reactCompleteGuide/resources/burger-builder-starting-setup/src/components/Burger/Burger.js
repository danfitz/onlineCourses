import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  // const ingredientsJSX = Object.keys(props.ingredients)
  //   .map(key => {
  //     return [...Array(props.ingredients[key])].map((_, i) => {
  //       return <BurgerIngredient key={key + i} type={key} />
  //     });
    // });

  const ingredientsJSX = [];

  Object.keys(props.ingredients)
    .forEach(ingredient => {
      for (let i = 0; i < props.ingredients[ingredient]; i++) {
        ingredientsJSX.push(
          <BurgerIngredient key={ingredient + i} type={ingredient} />
        );
      };
    });

  console.log(ingredientsJSX);

  // const numIngredients = ingredientsJSX.reduce((acc, cur) => {
  //   return acc + cur.length;
  // }, 0);

  // console.log(numIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {ingredientsJSX.length ? ingredientsJSX : <p>Please start adding ingredients!</p>}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;