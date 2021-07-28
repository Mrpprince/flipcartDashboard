import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Layout from '../../Components/Layout';
import './style.css'

/**
 * @author
 * @function Home
 * */
const Home = (props) => {
    return (
        <div >
            <Layout sidebar> 
                   <h1>Home page</h1> 
            </Layout>
        </div>
    );
}

export default Home;
