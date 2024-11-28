
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Home } from '../../pages/home/Home'
import { About } from '../../pages/about/About'
import { Contact } from '../../pages/contact/Contact'
import { Login } from '../login/Login';
import PrivateRoute from '../../routes/PrivateRoute';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export const NavbarComponent = () => {
  return (
    <>
      <Router>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            
            <Navbar.Brand href="#home">Rutas de reciclaje Costa Rica</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
                <Nav.Link as={Link} to="/about">Informacion</Nav.Link>
                <Nav.Link as={Link} to="/login">Identificarse</Nav.Link>
                <Nav.Link as={Link} to="/account">Cuenta Info</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<PrivateRoute />}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}
