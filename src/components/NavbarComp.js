import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Home from './Home';
import Tags from './Tags';
import Users from './Users';
import Details from './Details';
import '../Navbar.css';

function NavbarComp(){
    return (

        <Router>
            <div>
            <Navbar bg="dark" expand="lg" style={{height: '70px'}}>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" style={{color : "white"}}>GaryGram</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" style={{backgroundColor : "white"}} />
                    <Navbar.Collapse id="navbarScroll" className="bg-dark" style={{zIndex:"1", position:"relative"}}>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '200px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/" style={{color : "white", marginLeft:"10px"}}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/Users" style={{color : "white", marginLeft:"10px"}}>Users</Nav.Link>
                        <Nav.Link as={Link} to="/Tags/dog" style={{color : "white", marginLeft:"10px"}}>Tags</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
            <div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/Tags">
                    <Tags />
                </Route>
                <Route path="/Users">
                    <Users />
                </Route>
                <Route path="/Tags/:id" component={Tags} />
                <Route path="/Details/:id" component={Details} />
            </Switch>
            </div>
        </Router>
    );
}

export default NavbarComp;