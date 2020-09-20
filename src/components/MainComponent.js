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
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    promotions : state.promotions,
    leaders : state.leaders,
    comments : state.comments
  };
}

const mapDispatchToProps = (dispatch) => ({
  addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    const Homepage = () => {
      return(
        <Home 
          dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMess = {this.props.dishes.errMess}
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
        <Dishdetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMess}
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
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
