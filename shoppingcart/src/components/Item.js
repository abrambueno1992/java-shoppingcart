import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Item extends Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: props.quantity
        };
        this.add = this.add.bind(this);
        this.subtract = this.subtract.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }

    add() {
        this.setState({
            quantity: this.state.quantity + 1
        });
        this.props.handleTotal(this.props.price);
      }
    
    subtract() {
        this.setState({
            quantity: this.state.quantity - 1
        });
        this.props.handleTotal(-this.props.price);
      }
    
    showInfo() {
        this.props.handleShow(this.props.description);
      }

    add1() {
        return this + 1;
    }

    main() {
        var add1And2 this.add1.bind(3);
        add1And2(); // 4
    }
    
      render() {
        return (
          <div>
            <div className="row form-group">
              <div className="col-sm-10">
                <h4>{this.props.name} {this.props.description}: ${this.props.price}</h4>
              </div>
              {/* <div className="col-sm-2 text-right">description: {this.props.description}</div> */}
              <div className="col-sm-2 text-right">quantity: {this.state.quantity}</div>
            </div>
            <div className="row btn-toolbar">
              <div className="col-6">
                <button className="btn btn-outline-primary" onClick={this.showInfo}>
                  show info
                </button>
              </div>
              <div className="col-6 text-right">
                <button className="btn btn-outline-primary" onClick={this.add}>
                  +1
                </button>
                <button className="btn btn-outline-primary" onClick={this.subtract} disabled={this.state.quantity < 1}>
                  -1
                </button>
              </div>
            </div>
            <hr />
          </div>
        );
      }
    
}