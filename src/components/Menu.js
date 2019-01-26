import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      current: "home"
    };
  }

  menuItemClick = () => {
    this.setState({
      current: "",
      show: false
    });
  };

  hamburgerClick = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  render() {
    return (
      <header>
        <div className={`menu-btn-container ${this.state.show ? `close` : ``}`}>
          <div
            onClick={this.hamburgerClick}
            className={`menu-btn ${this.state.show ? `close` : ``}`}
          >
            <div className="btn-line" />
            <div className="btn-line" />
            <div className="btn-line" />
          </div>
        </div>

        <nav className={`menu ${this.state.show ? `show` : ``}`}>
          <ul className={`menu-nav ${this.state.show ? `show` : ``}`}>
            <Link
              to={"/"}
              className={`menu-nav-items ${this.state.show ? `show` : ``}`}
              onClick={this.menuItemClick}
            >
              Home
            </Link>
          </ul>
        </nav>
      </header>
    );
  }
}
