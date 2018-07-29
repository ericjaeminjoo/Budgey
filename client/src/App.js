import React, { Component } from "react";
import "./App.css";
import Navbar from "./global_components/Navbar";
import HomePage from "./pages/home_page/HomePage";
import ExpensePage from "./pages/expense_page/ExpensePage";
import axios from "axios";
import {Route, Switch} from 'react-router-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faCar,
  faUtensils,
  faTruck,
  faGamepad,
  faMoon
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faCar, faUtensils, faTruck, faGamepad, faMoon);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    }

  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    axios.get("http://localhost:3002/api/v1/category.json")
         .then(response => {
           this.setState({
             categories: response.data
           });
          })
         .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route strict path='/home' render={props => (
            <HomePage categories={this.state.categories} {...props}/>
            )}
          />
        </Switch>
        <Switch>
          <Route path='/expenses' component={ExpensePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
