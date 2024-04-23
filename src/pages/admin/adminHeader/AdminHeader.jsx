import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';


const AdminHeader = () => {
    const navigate = useNavigate();

    const logout = () =>{
        sessionStorage.clear();
        toast.success('Logout successfully.');
        setTimeout(()=>{
            navigate('/login');
        },1000)
    }

    return (
        <>
         <ToastContainer className="toast-common" />
          <Navbar className="header-nav" expand="lg">
                <Container fluid className="header-container">
                    <Navbar.Brand className= "manage-subscription-header header-logo">
                    </Navbar.Brand>
                    <Navbar className="manage-subscription-header">
                        <Nav className="nav-menu">
                            <Nav.Item className="pl-30">
                                <Dropdown>
                                    <Dropdown.Toggle>
                                        <span className="icon-username" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Container>
            </Navbar>
        </>
    )
}

export default AdminHeader;