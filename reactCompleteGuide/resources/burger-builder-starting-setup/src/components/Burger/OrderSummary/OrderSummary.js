import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const summaryJSX = Object.keys(props.ingredients)
    .map(key => {
      return <li key={key}><span style={{textTransform: "capitalize"}}>{key}</span>: {props.ingredients[key]}</li>;
    });

  return (
    <Auxiliary>
      <h2>Your Order</h2>
      <h3>Price: ${props.price.toFixed(2)}</h3>
      <p>Your burger includes the following ingredients:</p>
      <ul>
        {summaryJSX}
      </ul>
      <p>Continue to checkout?</p>
      <Button type="Success">Checkout</Button>
      <Button type="Danger">Cancel</Button>
    </Auxiliary>
  );
};

export default orderSummary;