import axios from 'axios';
import {React, Component, useState} from 'react';
import {Col, Card, ListGroup, ListGroupItem, Container, Row, Image, Modal, Button} from "react-bootstrap";
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import { FaIdCardAlt, FaRegCalendarAlt, FaTransgender } from 'react-icons/fa';
import { AiOutlineMail, AiTwotonePhone } from 'react-icons/ai';
import ReactDOM from 'react-dom'
import Moment from 'moment';
import {Link} from "react-router-dom";
import Comments from './Comments';



const BASE_URL = 'https://dummyapi.io/data/v1';
const key = "61700db975572567b7e861ed";

class Details extends Component {
  state = {
    data : [],
    id : "",
    dataPost : [],
  };

  handleData = (X) => {
    axios
        .get(`${BASE_URL}/user/${X}`, { headers: { "app-id": key } })
        .then((res) => {
            this.setState({ data: res.data });
            console.log(res.data);
        })
        .catch(console.error);
};

  handleDataPost = (X) => {
    axios
        .get(`${BASE_URL}/user/${X}/post`, { headers: { "app-id": key } })
        .then((res) => {
            this.setState({ dataPost: res.data.data });
        })
        .catch(console.error);
};

  componentDidMount(){
    this.handleData(this.props.match.params.id);
    this.handleDataPost(this.props.match.params.id);
    console.log(this.props);
  }

  render() {
    return (
      <div style={{backgroundColor:"#FEB12A", margin: "auto", textAlign: "center"}}>
          <Container>
              <Row className="justify-content-center" style={{display:"flex"}}>
              <Col md={12} xs={12} style={{backgroundColor:"#00203FFF", color:"#ADEFD1FF", marginTop:"20px", width:"95%", borderRadius: "20px"}}>
                  <Row className="justify-content-center" style={{marginTop:"15px", marginBottom:"15px"}}>
                    <Col md={{span: 4, offset: 1}} xs={12}>
                      <Row>
                        <Col md={12} xs={12} >
                          <h4>{this.state.data.firstName + " " + this.state.data.lastName}</h4>
                        </Col>
                        <Col md={12} xs={12}>
                          <Image style={{height:"200px", width:"200px"}} src={this.state.data.picture} thumbnail/>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={7} xs={12} style={{textAlign:"left", alignItems:"center"}}>
                      <Row>
                        <Col md={12} xs={12} style={{display:"flex", marginTop:"15px"}}>
                          <FaIdCardAlt style={{marginRight: "4px"}} />
                          <h6>User ID : {this.state.data.id}</h6>
                        </Col>
                        <Col md={12} xs={12} style={{display:"flex", marginTop:"15px"}}>
                          <FaRegCalendarAlt style={{marginRight: "4px"}} />
                          <h6>Date of Birth : {Moment(this.state.data.dateOfBirth).format('MMMM Do, YYYY')}</h6>
                        </Col>
                        <Col md={12} xs={12} style={{display:"flex", marginTop:"15px"}}>
                          <AiOutlineMail style={{marginRight: "4px"}} />
                          <h6>Email : {this.state.data.email}</h6>
                        </Col>
                        <Col md={12} xs={12} style={{display:"flex", marginTop:"15px"}}>
                          <AiTwotonePhone style={{marginRight: "4px"}} />
                          <h6>Phone : {this.state.data.phone}</h6>
                        </Col>
                        <Col md={12} xs={12} style={{display:"flex", marginTop:"15px"}}>
                          <FaTransgender style={{marginRight: "4px"}} />
                          <h6>Gender : {this.state.data.gender}</h6>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
              </Col>
                {this.state.dataPost.map(display =>
                <Col lg={4} md={6} sm={12} style={{display:"flex"}} className="justify-content-center">
                <Card border="dark" style={{ width: '23rem', marginTop:'20px', borderRadius:'35px', backgroundColor:'#0074FF', color: 'white'}}>
                <Card.Body>
                <div style={{textAlign:"left"}}>
                <Image src={display.owner.picture} style={{width: '50px', display: 'inline-block', marginRight:'10px'}}  roundedCircle />
                <Card.Title style={{display: 'inline-block'}}>{display.owner.firstName + " " + display.owner.lastName}</Card.Title>
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
                    <Link to={`/Tags/${display.tags[0]}`} style={{ textDecoration: 'none'}}>
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



  export default Details;

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


