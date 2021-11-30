import axios from 'axios';
import {React, Component, useState} from 'react';
import {Col, Card, ListGroup, ListGroupItem, Container, Row, Image, Button, Modal, FormControl, Form } from "react-bootstrap";
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import '../About.css';
import Moment from 'moment';
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom';
import { FaDog } from 'react-icons/fa';
import Comments from './Comments';

const BASE_URL = 'https://dummyapi.io/data/v1';
const key = "61700db975572567b7e861ed";

class Tags extends Component {
    state = {
        data : [],
        id : "",
        value : "tag"
      };

    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);

      handleChange(event) {
        this.setState({value: event.target.value});
      }
  
      handleSubmit(event) {
        this.handleData(this.state.value);
        event.preventDefault();
      }

      handleData = (X) => {
        axios
            .get(`${BASE_URL}/tag/${X}/post`, { headers: { "app-id": key } })
            .then((res) => {
              this.setState({ data: res.data.data });
              console.log(res);
            })
            .catch(console.error);
    };

    componentDidMount(){
      this.handleData(this.props.match.params.id);
      this.setState({ value: this.props.id })
      console.log(this.props);
    }
      render() {
        return (
          <div style={{backgroundColor:"#FEB12A", margin: "auto", textAlign: "center", paddingTop: '20px'}}>
              <Form style={{width: '250px', margin: 'auto', marginTop:'20px', height: "40px", display: 'flex'}}
              onSubmit={this.handleSubmit}>
                  <FormControl
                  type="search"
                  value={this.state.value}
                  onChange={this.handleChange}
                  id="searchTag"
                  placeholder="Tag"
                  className="me-2"
                  aria-label="Search"
                  style={{display: 'flex'}}
                  />
                  <Button variant="success" type="submit">Search</Button>
              </Form>
              <Container style={{marginTop:'10px'}}>
                  <Row className="justify-content-center">
                    {this.state.data.map(display =>
                    <Col lg={4} md={6} sm={12} style={{display:"flex"}}>
                    <Card border="dark" style={{ width: '20rem', marginTop:'20px', borderRadius:'35px', backgroundColor:'#0074FF', color: 'white', marginLeft:'auto', marginRight:"auto"}}>
                    <Card.Body>
                    <div style={{textAlign:"left"}}>
                    <Link to={`/Details/${display.owner.id}`}>
                      <Image src={display.owner.picture} style={{width: '50px', display: 'inline-block', marginRight:'10px'}}  roundedCircle />
                      <Card.Title style={{display: 'inline-block', color:"white"}}>{display.owner.firstName + " " + display.owner.lastName}</Card.Title>
                    </Link>
                    </div>
                    </Card.Body>
                    <Card.Img variant="top" src={display.image} style={{height : 200}}/>
                    <Card.Body style={{height:"70px"}}>
                        <Card.Text>
                        {display.text}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem style={{backgroundColor:'#0074FF'}}>
                        <Link to={`/Tags/${display.tags[0]}` } style={{ textDecoration: 'none'}}>
                          <Card.Link tag1={display.tags[0]} href="#" style={{ textDecoration: 'none', color: 'yellow' }}>{`#` +display.tags[0] + " "}</Card.Link>
                        </Link>
                        <Link to={`/Tags/${display.tags[1]}`} style={{ textDecoration: 'none'}}>
                          <Card.Link tag1={display.tags[1]} href="#" style={{ textDecoration: 'none', color: 'yellow' }}>{`#` +display.tags[1] + " "}</Card.Link>
                        </Link>
                        <Link to={`/Tags/${display.tags[2]}`} style={{ textDecoration: 'none'}}>
                          <Card.Link tag1={display.tags[2]} href="#" style={{ textDecoration: 'none', color: 'yellow' }}>{`#` +display.tags[2]}</Card.Link>
                        </Link>
                          </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Text style={{display : "inline-block", marginRight : "20px"}}><BsFillSuitHeartFill />{" " + display.likes}</Card.Text>
                        <CommentModal postID={display.id}/>
                        <Card.Text style={{color:"#C1C1C1"}}>
                          {Moment(display.publishDate).format('MMMM Do, YYYY, hh:mm:ss a')}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>
                    )}
                </Row>
                </Container>
               
            </div>
        )
      }
    }

export default Tags;

function CommentModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(props.postID);

  return (
    <>
      <Button onClick={handleShow} style={{ textDecoration: 'none', color: 'white' }}  data-bs-toggle="modal" data-bs-target="#exampleModal"><BiCommentDetail /> 
      {" " + "Comments"}
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Comments id={props.postID}/>
          </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}