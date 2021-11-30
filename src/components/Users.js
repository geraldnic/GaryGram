import axios from 'axios';
import {React, Component, Display} from 'react';
import {Col, Card, ListGroup, ListGroupItem, Container, Row, Image, Button} from "react-bootstrap";
import { ImProfile } from 'react-icons/im';
import {Link} from "react-router-dom";


const BASE_URL = 'https://dummyapi.io/data/v1';
const key = "61700db975572567b7e861ed";


class Users extends Component {
      state = {
        data : [],
      }
    
      constructor() {
        super()
        axios.get(`${BASE_URL}/user`, { headers: { 'app-id': key } })
          .then(res => {
            this.setState({ data: res.data.data })
            console.log(res);
          })
          .catch(console.error)
      }
    
      render(){
        return (
            <div>
                <div style={{backgroundColor:"#FEB12A", margin: "auto", textAlign: "center"}}>
                <Container>
                    <Row className="justify-content-center">
                        {this.state.data.map(display =>
                        <Post fullName={display.firstName + " " + display.lastName}
                        postPhoto={display.picture}
                        firstName={display.firstName} userID={display.id}
                        />
                        )}
                    </Row>
                    </Container>
                
                </div>
            </div>
        )
      }
}

export default Users

function Post(props) {
  return (
    <Col lg={4} md={6} sm={12} style={{display:"flex"}}>
      <Card border="dark" style={{ width: '20rem', marginTop:'20px', borderRadius:'20px', backgroundColor:'#0074FF', color:'white', fontWeight:'bold', fontSize:'20px', marginLeft:"auto", marginRight:"auto"}}>
        <Card.Body>
          <Card.Text> {props.fullName}  </Card.Text>
        </Card.Body>
        <Card.Img variant="top" src={props.postPhoto} style={{height : 200}}/>
        <Card.Body style={{textAlign: 'center'}}>
          <Link to={`/Details/${props.userID}`}>
            <Button variant="outline-info" style={{width: '165px', color: 'black'}}>
              <Image src="https://upload-icon.s3.amazonaws.com/uploads/icons/png/19339625881548233621-512.png" style={{width: '30px', marginRight: 10}}/>
                {props.firstName}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  )
}
