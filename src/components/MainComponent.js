// container component which holds all the states and functions required
import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetails from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES
    };
  }

  render() {
    const Homepage = () => {
      return(
        <Home />
      )
    }
    console.log("Main component render invoked");
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
