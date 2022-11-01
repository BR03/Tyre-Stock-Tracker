import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditStockfunc = () => {
  const [state, setState] = useState({
    brand: "",
    godown: "",
    brands: [],
    godowns: [],
    vehicle_name: "",
    size: "",
    no_of_units: 0,
    date: new Date(),
  });

  const { id } = useParams();

  const getData = () => {
    axios
      .get("http://localhost:5000/stocks/" + id)
      .then((response) => {
        setState((state) => ({
          ...state,
          brand: response.data.brand,
          godown: response.data.godown,
          vehicle_name: response.data.vehicle_name,
          size: response.data.size,
          no_of_units: response.data.no_of_units,
          date: new Date(response.data.date),
        }));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:5000/brands/").then((response) => {
      if (response.data.length > 0) {
        setState((state) => ({
          ...state,
          brands: response.data.map((brand) => brand.name),
        }));
      }
    });

    axios.get("http://localhost:5000/godowns/").then((response) => {
      if (response.data.length > 0) {
        setState((state) => ({
          ...state,
          godowns: response.data.map((godown) => godown.name),
        }));
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeBrand = (e) => {
    setState({
      ...state,
      brand: e.target.value,
    });
  };

  const onChangeVehicleName = (e) => {
    setState({
      ...state,
      vehicle_name: e.target.value,
    });
  };

  const onChangeSize = (e) => {
    setState({
      ...state,
      size: e.target.value,
    });
  };

  const onChangeNoOfUnits = (e) => {
    setState({
      ...state,
      no_of_units: e.target.value,
    });
  };

  const onChangeGodown = (e) => {
    setState({
      ...state,
      godown: e.target.value,
    });
  };

  const onChangeDate = (date) => {
    setState({
      ...state,
      date: date,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const stock = {
      brand: state.brand,
      godown: state.godown,
      vehicle_name: state.vehicle_name,
      size: state.size,
      no_of_units: state.no_of_units,
      date: state.date,
    };

    axios
      .post("http://localhost:5000/stocks/update/" + id, stock)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Edit stock log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Brand: </label>
          <select
            // ref="useRef()"
            required
            className="form-control"
            value={state.brand}
            onChange={onChangeBrand}
          >
            {state.brands.map(function (brand) {
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
            // ref="useRef()"
            required
            className="form-control"
            value={state.godown}
            onChange={onChangeGodown}
          >
            {state.godowns.map(function (godown) {
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
            value={state.vehicle_name}
            onChange={onChangeVehicleName}
          />
        </div>
        <div className="form-group">
          <label>Size: </label>
          <input
            type="text"
            required
            className="form-control"
            value={state.size}
            onChange={onChangeSize}
          />
        </div>
        <div className="form-group">
          <label>No Of Units: </label>
          <input
            type="text"
            required
            className="form-control"
            value={state.no_of_units}
            onChange={onChangeNoOfUnits}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={state.date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Edit Stock Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditStockfunc;
