import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateStock extends Component {
  constructor(props) {
    super(props);

    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeVehicleName = this.onChangeVehicleName.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeNoOfUnits = this.onChangeNoOfUnits.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeGodown = this.onChangeGodown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      brands: [],
      godowns: [],
      vehicle_name: "",
      size: "",
      no_of_units: 0,
      date: new Date(),
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/brands/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          brands: response.data.map((brand) => brand.name),
          brand: response.data[0].name,
        });
      }
    });

    axios.get("http://localhost:5000/godowns/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          godowns: response.data.map((godown) => godown.name),
          godown: response.data[0].name,
        });
      }
    });
  }

  onChangeBrand(e) {
    this.setState({
      brand: e.target.value,
    });
  }

  onChangeVehicleName(e) {
    this.setState({
      vehicle_name: e.target.value,
    });
  }

  onChangeSize(e) {
    this.setState({
      size: e.target.value,
    });
  }

  onChangeNoOfUnits(e) {
    this.setState({
      no_of_units: e.target.value,
    });
  }

  onChangeGodown(e) {
    this.setState({
      godown: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const stock = {
      brand: this.state.brand,
      godown: this.state.godown,
      vehicle_name: this.state.vehicle_name,
      size: this.state.size,
      no_of_units: this.state.no_of_units,
      date: this.state.date,
    };

    axios
      .post("http://localhost:5000/stocks/add", stock)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create new stock log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Brand: </label>
            <select
              ref="useRef()"
              required
              className="form-control"
              value={this.state.brand}
              onChange={this.onChangeBrand}
            >
              {this.state.brands.map(function (brand) {
                return (
                  <option key={brand} value={brand}>
                    {" "}
                    {brand}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Godown: </label>
            <select
              ref="useRef()"
              required
              className="form-control"
              value={this.state.godown}
              onChange={this.onChangeGodown}
            >
              {this.state.godowns.map(function (godown) {
                return (
                  <option key={godown} value={godown}>
                    {" "}
                    {godown}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Vehicle Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.vehicle_name}
              onChange={this.onChangeVehicleName}
            />
          </div>
          <div className="form-group">
            <label>Size: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.size}
              onChange={this.onChangeSize}
            />
          </div>
          <div className="form-group">
            <label>No Of Units: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.no_of_units}
              onChange={this.onChangeNoOfUnits}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Stock Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
