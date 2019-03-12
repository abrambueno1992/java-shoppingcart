import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class ShopperProfile extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div>
        <h3>SHopper Profile</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopperProfile);
