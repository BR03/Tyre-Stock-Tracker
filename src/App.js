import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import StocksList from "./components/stockslist";
// import EditStock from "./components/editstock";
import EditStockfunc from "./components/EditStockfunc";
import CreateStock from "./components/createstock";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" exact element={<StocksList />} />
          <Route path="/edit/:id" element={<EditStockfunc />} />
          <Route path="/create" exact element={<CreateStock />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
