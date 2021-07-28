import React, { useState } from 'react';
import { Container, Row, Button, Col, Form } from 'react-bootstrap';
import Layout from '../../Components/Layout';
import Input from '../../Components/UI/input';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../actions/users.actions';

/**
 * @author
 * @function Signup
 * */
const Signup = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const userSignup = (e) => {
        e.preventDefault();
      const   user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user))
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }
    if(user.loading){
        return <p>loading.....!!!</p>
    }
    return (
        <div>

            <Layout>
                <Container>
                    {user.message}
                    <Row style={{ marginTop: "50px" }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userSignup}>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                            label="First Name"
                                            placeholder="First name"
                                            value={firstName}
                                            type="text"
                                            onChange={(e) => { setFirstName(e.target.value) }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            label="Last Name"
                                            placeholder="Last name"
                                            value={lastName}
                                            type="text"
                                            onChange={(e) => { setLastName(e.target.value) }}
                                        />
                                    </Col>
                                </Row>
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
    );
}

export default Signup;
