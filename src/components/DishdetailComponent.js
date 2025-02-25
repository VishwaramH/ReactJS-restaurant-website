// presentational component
import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && (val.length);
const minLength = (len) => (val) => val && (val.length>=len);
const maxLength = (len) => (val) => !(val) || (val.length<=len);

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen : false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleCommentForm = this.handleCommentForm.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen : !this.state.isModalOpen
    });
  }

  handleCommentForm(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
            <LocalForm onSubmit={this.handleCommentForm}>
            <Row className="form-group">
              <Label htmlFor="name" md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" name="rating"
                    className="form-control" >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>Your name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" name="author" className="form-control" placeholder="Your Name"
                  validators = {{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                  }} />
                  <Errors className="text-danger" show="touched" model=".name"
                    messages={{
                      required: 'Required ',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>Comment</Label>
                <Col md={12}>
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
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
          <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      );
    }
    else {
      return(
        <div></div>
      );
    }
  }

  function RenderComments( {comments, postComment, dishId} ) { //props as the function parameter
    if(comments!=null) {
      const cmts = comments.map(cmt => {
        return(
          <Fade in>
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
              <CommentForm dishId={dishId} postComment={postComment} />
            </li>
          </Fade>
        );
      });
      return(
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            <Stagger in>
              {cmts}
            </Stagger>
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
    if(props.isLoading) {
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }
    else if(props.errMess) {
      return(
        <div className="container">
          <div className="row">
            {props.errMess}
          </div>
        </div>
      );
    }
    else if(props.dish!=null) {
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
              <RenderComments comments={props.comments} 
              postComment={props.postComment} dishId={props.dish.id} />
            </div>
          </div>
        </div>
      );
    }
    else {
      return(
        <div></div>
      );
    }
  }

export default Dishdetails;