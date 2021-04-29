import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import StocksList from "./components/stockslist";
import EditStock from "./components/editstock";
import CreateStock from "./components/createstock";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={StocksList} />
        <Route path="/edit/:id" exact component={EditStock} />
        <Route path="/create" exact component={CreateStock} />
      </div>
    </Router>
  );
}

export default App;
