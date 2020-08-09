import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class Dishdetails extends Component {

  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    if(dish!=null) {
      return(
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    }
    else {
      return(
        <div></div>
      );
    }
  }

  renderComments(comments) {
    if(comments==null) {
      return(
        <div></div>
      );
    }
    const cmts = comments.map(cmt => {
      return(
        <li key={cmt.id}>
          <p>{cmt.comment}</p>
          <p>-- {cmt.author},
            &nbsp;
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(new Date(cmt.date))}
          </p>
        </li>
      );
    });
    return(
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {cmts}
        </ul>
      </div>
    )
  }

  render() {
    const dish = this.props.selectedDish;
    if(dish==null) {
      return(
        <div></div>
      );
    }
    const dishItems = this.renderDish(dish);
    const comments = this.renderComments(dish.comments);
    return(
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {dishItems}
          </div>
          <div className="col-12 col-md-5 m-1">
            {comments}
          </div>
        </div>
    );
  }
}

export default Dishdetails;