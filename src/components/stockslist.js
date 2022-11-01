import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Stock = (props) => (
  <tr>
    <td>{props.stock.brand}</td>
    <td>{props.stock.godown}</td>
    <td>{props.stock.vehicle_name}</td>
    <td>{props.stock.size}</td>
    <td>{props.stock.no_of_units}</td>
    <td>{props.stock.date.substring(0, 10)}</td>
    <td>
      <Link to={"edit/" + props.stock._id}> edit </Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteStock(props.stock._id);
        }}
      >
        {" "}
        delete
      </a>
    </td>
  </tr>
);

export default class StocksList extends Component {
  constructor(props) {
    super(props);

    this.deleteStock = this.deleteStock.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = { stocks: [], searchValue: "", searchResults: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/stocks/")
      .then((response) => {
        this.setState({ stocks: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteStock(id) {
    axios
      .delete("http://localhost:5000/stocks/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      stocks: this.state.stocks.filter((el) => el._id !== id),
    });
  }

  renderStock = (stock) => {
    return (
      <Stock stock={stock} deleteStock={this.deleteStock} key={stock._id} />
    );
  };

  handleChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  render() {
    const searchValue = this.state.searchValue;
    const searchedStocks = this.state.stocks.filter((stock) => {
      return (
        stock.brand.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
        stock.godown.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
        stock.vehicle_name.toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 ||
        stock.size.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      );
    });

    return (
      <div>
        <h3 style={{ float: "left", width: "200px" }}>Logged Stocks</h3>

        <nav
          className="navbar navbar-light"
          style={{ float: "right", width: "340px" }}
        >
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search..."
              aria-label="Search"
              onChange={this.handleChange}
              style={{ float: "right", width: "300px" }}
            />
          </form>
        </nav>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Brand</th>
              <th>Godown</th>
              <th>Vehicle Name</th>
              <th>Size</th>
              <th>No of Units</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchedStocks.map((stock) => {
              return this.renderStock(stock);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
