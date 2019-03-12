import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProductList, createNewProduct } from "../actions/productList";
import { Item } from "./Item";

export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      name: "",
      price: 0,
      quantity: 0
    };
  }

  static propTypes = {
    prop: PropTypes
  };
  componentDidMount() {
    this.props.getProductList();
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  sendNewProduct = e => {
    const quantity = parseFloat(this.state.quantity);
    const price = parseFloat(this.state.price);
    const productObject = {
      description: this.state.description,
      name: this.state.name,
      price: price,
      quantity: quantity
    };
    this.props.createNewProduct(productObject);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.new_product === null &&
      this.props.new_product !== prevProps.new_product
    ) {
      console.log("New data is: ", this.props.new_product);
    }
  }

  render() {
    console.log("Data is : ", this.props.product_list);
    console.log("Input change of state:", this.state.description);

    if (this.props.product_list === null) {
      return (
        <p>Loading...</p>
      );
    }

    const itemComponents = this.props.product_list.map((productItem) => {
      return (
        <Item {...productItem}></Item>
      );
    });
    return (
      <div>
        <div class="wrapper"> 
          <input
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <input
            name="price"
            placeholder="Please enter a price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <input
            name="quantity"
            placeholder="Please enter a quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button onClick={this.sendNewProduct}>hey</button>
        </div>
        <div class="item">{itemComponents}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product_list: state.product_list,
    new_product: state.new_product
  };
};
export default connect(
  mapStateToProps,
  { getProductList, createNewProduct }
)(ProductList);

// const mapDispatchToProps = {};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ProductList);
