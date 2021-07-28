import React from 'react';
import { Container, Jumbotron, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../actions/auth.actions';
/**
 * @author
 * @function Header
 * */
const Header = (props) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(signOut())
    }

    const renderLoggedIn = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logOut}>Signout</span>
                </li>
            </Nav>
        )
    }

    const renderNonLoggedIn = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <Link to='/signin' className="nav-link">Signin</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/signup'>Signup</Link>
                </li>

            </Nav>
        )
    }
    return (
        <div>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: "1" }}>
                <Container fluid>
                    <Link to='/' className="navbar-brand">Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        </Nav>
                        {
                            auth.authenticate ? renderLoggedIn() : renderNonLoggedIn()
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
