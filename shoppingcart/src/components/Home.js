import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true
    };
  }

  static propTypes = {
    prop: PropTypes
  };
  handleButton = () => {
    this.setState({ login: !this.state.login });
  };

  render() {
    if (this.state.login === true) {
      return (
        <div>
          <h3>Login</h3>
          <button onClick={this.handleButton}>Signup</button>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Signup</h3>
          <button onClick={this.handleButton}>Login</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
