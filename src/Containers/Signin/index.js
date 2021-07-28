import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/auth.actions';
import Layout from '../../Components/Layout';
import Input from '../../Components/UI/input';

/**
 * @author
 * @function Signin
 * */
const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();





    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user))
    }
    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }
    return (
        <div>
            <div>
                <Layout>
                    <Container>
                        <Row style={{ marginTop: "50px" }}>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Form onSubmit={userLogin}>
                                    <Input
                                        label="Email"
                                        placeholder="Email"
                                        value={email}
                                        type="Email"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />

                                    <Input
                                        label="Password"
                                        placeholder="Password"
                                        value={password}
                                        type="Password"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />

                                    <Button variant="primary" type="submit">
                                        Submit
                                </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </div>
        </div>
    );
}

export default Signin;
