import React from "react";

export default props => {
  return (
    <div>
      <h3>
        Product: {props.product.name} Price: ${props.price}
      </h3>
      <h3>Description: {props.product.description} </h3>
      <h3>
        Quantity: {props.quantity} Cost: ${props.cost}{" "}
      </h3>
    </div>
  );
};
