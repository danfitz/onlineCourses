import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };

  updateIngredient = event => {
    this.setState((prevState) => {
      return {
        [event.target.name]: prevState[event.target.name] + event.target.value
      };
    });
  };

  render() {
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls updateIngredient={this.updateIngredient} />
      </Auxiliary>
    );
  };
};

export default BurgerBuilder;