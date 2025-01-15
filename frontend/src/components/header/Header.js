import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">BitExplorer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        
                        
                
                            
                        
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
