// container component which holds all the states and functions required
import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetails from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      comments: COMMENTS
    };
  }

  render() {
    const Homepage = () => {
      return(
        <Home 
          dish = {this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion = {this.state.promotions.filter((promo) => promo.featured)[0]}
          leader = {this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const AboutUs = () => {
      return(
        <About leaders = {this.state.leaders} />
      );
    }

    const DishwithId = ({match}) => {
      return(
        <Dishdetails dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.state.comments.filter((comment) => comment.id === parseInt(match.params.dishId, 10))} />
      )
    }
    // console.log("Main component render invoked");
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishwithId} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
