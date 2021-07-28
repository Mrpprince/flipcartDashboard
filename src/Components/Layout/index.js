import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Header from '../Header';
import './style.css'
/**
 * @author
 * @function Layout
 * */
const Layout = (props) => {
    return (
        <div>
            <Header />
            {
                props.sidebar ? <Container fluid>
                    <Row>
                        <Col md={2} className="sidebar">
                            <ul>
                                <li>
                                    <NavLink exact to={`/`}>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/category`}>Category</NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/products`}>products</NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/orders`}>orders</NavLink>
                                </li>
                            </ul>
                        </Col>
                        <Col md={10} style={{ marginLeft: 'auto' ,padding:"60px"}}>
                            {props.children}
                        </Col>
                    </Row>
                </Container> :
                     props.children 
            }


        </div>
    );
}

export default Layout;
