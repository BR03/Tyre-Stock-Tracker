import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark nvbar-expand-lg">
        <Link to="/" className="navbar-brand">
          StocksTracker
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Stock Log
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
