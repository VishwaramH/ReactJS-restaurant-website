// container component which holds all the states and functions required
import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetails from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    promotions : state.promotions,
    leaders : state.leaders,
    comments : state.comments
  };
}

const mapDispatchToProps = (dispatch) => ({
  addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Homepage = () => {
      return(
        <Home 
          dish = {this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion = {this.props.promotions.filter((promo) => promo.featured)[0]}
          leader = {this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const AboutUs = () => {
      return(
        <About leaders = {this.props.leaders} />
      );
    }

    const DishwithId = ({match}) => {
      return(
        <Dishdetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.id === parseInt(match.params.dishId, 10))} 
          addComment = {this.props.addComment} />
      )
    }
    // console.log("Main component render invoked");
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishwithId} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
