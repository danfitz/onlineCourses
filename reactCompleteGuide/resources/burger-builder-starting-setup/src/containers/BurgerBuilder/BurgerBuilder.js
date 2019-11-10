import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    summaryVisible: false
  };

  updatePurchaseState = () => {
    this.setState(prevState => {
      const numIngredients = Object.keys(prevState.ingredients)
        .reduce((acc, cur) => {
          return acc + prevState.ingredients[cur];
        }, 0);

      return {
        purchasable: numIngredients > 0
      };
    });
  };

  addIngredientHandler = type => {
    this.setState((prevState) => {
      const newIngredients = { ...prevState.ingredients };
      newIngredients[type] += 1;

      return {
        ingredients: newIngredients,
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
      };
    });

    this.updatePurchaseState();
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) return;

    this.setState((prevState) => {
      const newIngredients = { ...prevState.ingredients };
      newIngredients[type] -= 1;

      return {
        ingredients: newIngredients,
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
      };
    });

    this.updatePurchaseState();
  };

  summaryHandler = () => {
    this.setState(prevState => {
      return {
        summaryVisible: !prevState.summaryVisible
      };
    });
  };
  
  checkoutHandler = () => {
    alert("Enjoy your burger!");
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };

    return (
      <Auxiliary>
        <Modal
          show={this.state.summaryVisible}
          exit={this.summaryHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            exit={this.summaryHandler}
            checkout={this.checkoutHandler}
          />
        </Modal>
        
        <Burger
          ingredients={this.state.ingredients}
        />

        <BuildControls
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          disabledInfo={disabledInfo}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          showSummary={this.summaryHandler}
        />
      </Auxiliary>
    );
  };
};

export default BurgerBuilder;