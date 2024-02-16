import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { authActions } from "../store/authReducer";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('token');
    navigate('/login');
  }
    return(
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>

          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
          </Nav>
          {isLoggedIn ? (
          <Nav>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        )}  
        </Container>
      </Navbar>
    )
}
export default Navigation;