import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from "./components/Navbar";
import Default from "./components/Default";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Navbar />
          <Switch>
              <Route exact path="/" component={Products} />
              <Route path="/details" component={ProductDetails} />
              <Route component={Default} />
          </Switch>
        </React.Fragment>
    );
  }
}

export default App;
