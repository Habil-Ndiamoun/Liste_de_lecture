import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function BarreNavigation(){
    return(
        <Navbar bg="light" expand="sm">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Accueil</Nav.Link>
                    <Nav.Link href="/repertoire">Repertoire</Nav.Link>  
                    {/*<Nav.Link href="/liste-articles">Articles</Nav.Link>
                    <Nav.Link href="/autres-articles">Autres articles</Nav.Link>*/}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BarreNavigation;