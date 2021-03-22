import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorModal from "../../hoc/withErrorModal/withErrorModal";

import axios from "../../axiosOrders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: undefined,
    totalPrice: 4,
    purchasable: false,
    summaryVisible: false,
    checkoutLoading: false,
    error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

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
    this.setState({ checkoutLoading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Dan Fitz",
        address: {
          street: "123 Main Street",
          zipCode: "A1A1A1",
          country: "Canada"
        },
        email: "dan@danfitz.com"
      },
      deliveryMethod: "fastest"
    };

    axios.post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ checkoutLoading: false, summaryVisible: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ checkoutLoading: false, summaryVisible: false });
      });
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
          { this.state.checkoutLoading || !this.state.ingredients ?
            <Spinner /> :
            <OrderSummary
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              exit={this.summaryHandler}
              checkout={this.checkoutHandler}
            /> }
        </Modal>

        {this.state.ingredients ? (
          <Auxiliary>
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
        ) : this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />}
      </Auxiliary>
    );
  };
};

export default withErrorModal(BurgerBuilder, axios);