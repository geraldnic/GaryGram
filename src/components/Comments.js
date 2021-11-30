import axios from 'axios';
import {React, Component} from 'react';
import {Col, Card, ListGroup, ListGroupItem, Container, Row, Image} from "react-bootstrap";
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import { FaIdCardAlt, FaRegCalendarAlt, FaTransgender } from 'react-icons/fa';
import { AiOutlineMail, AiTwotonePhone } from 'react-icons/ai';
import ReactDOM from 'react-dom'
import Moment from 'moment';
import {Link} from "react-router-dom";

const BASE_URL = 'https://dummyapi.io/data/v1';
const key = "61700db975572567b7e861ed";

class Comments extends Component {
    state = {
        data : [],
      };

      handleComments = (X) => {
        axios
            .get(`${BASE_URL}/post/${X}/comment`, { headers: { "app-id": key } })
            .then((res) => {
                this.setState({ data: res.data.data });
                console.log(res);
            })
            .catch(console.error);
    };

    componentDidMount() {
        this.handleComments(this.props.id);
    }

    render() {
        return (
            <div style={{display:'flex', paddingTop:'15px', paddingBottom:'15px'}}>
                <Container>
                {this.state.data.map(display =>
                    <Row style={{border:'2px solid black', marginBottom:"15px"}}>
                            <Col lg={2} md={2} sm={2}>
                            <Link to={`/Details/${display.owner.id}`}>
                                <Image style={{marginTop:'5px'}} src={display.owner.picture} roundedCircle />
                            </Link>
                        </Col>
                        <Col lg={{span: 9, offset:1}} md={{span: 9, offset:1}} sm={{span: 9, offset:1}}>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                    <div>
                                        <Link style={{textDecoration:'none'}} to={`/Details/${display.owner.id}`}>
                                            <h2 style={{color: 'black', textDecoration:'none'}}>{display.owner.firstName + " " + display.owner.lastName}</h2>
                                        </Link>
                                    </div>
                                </Col>
                                <Col lg={12} md={12} sm={12}>
                                    <div>
                                        <p style={{fontSize:"22px"}}>{display.message}</p>
                                    </div>
                                </Col>
                                <Col lg={12} md={12} sm={12}>
                                    <div>
                                        <p style={{fontSize:"15px",textAlign:"right", marginTop:'-10px', marginBottom:'0px'}}>{Moment(display.publishDate).format('MMMM Do, YYYY')}</p>
                                    </div>
                                </Col>
                            </Row>
                         </Col> 
                    </Row>
                    )}
                </Container>
            </div>
        );
    }
}

export default Comments
