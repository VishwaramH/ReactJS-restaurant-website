// presentational component
import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && (val.length);
const minLength = (len) => (val) => val && (val.length>=len);
const maxLength = (len) => (val) => !(val) || (val.length<=len);

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen : false
    }
  }

  toggleModal() {
    this.setState({
      isModalOpen : !this.state.isModalOpen
    });
  }

  handleCommentForm(values) {
    this.toggleModal();
    console.log("Current state is " + JSON.stringify(values));
    alert("Current state is " + JSON.stringify(values));
  }

  render() {
    return(
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleCommentForm(values)}>
            <Row className="form-group">
              <Label htmlFor="name">Rating</Label>
                <Control.select model=".rating" name="rating"
                  className="form-control" >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name">Your name</Label>
                <Control.text model=".name" id="name" name="name" className="form-control" 
                validators = {{
                  required, minLength: minLength(3), maxLength: maxLength(15)
                }} />
                <Errors className="text-danger" show="touched" model=".email"
                  messages={{
                    required: 'Required ',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less'
                }} />
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Col md={10}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6" className="form-control" />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

  function RenderDish( {dish} ) { // props as the function parameter
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

  function RenderComments( {comments} ) { //props as the function parameter
    if(comments!=null) {
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
            <CommentForm />
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
      );
    }
    else {
      return(
        <div></div>
      );
    }
    
  }
  const Dishdetails = (props) => {
    const dish = props.selectedDish;
    if(dish==null) {
      return(
        <div></div>
      );
    }
    return(
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  }

export default Dishdetails;