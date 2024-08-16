import LoginForm from "./components/LoginForm";
import Bloglist from "./components/Bloglist";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import UserStats from "./components/UserStats";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { logout } from "./reducers/UserReducer";

const Menu = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
  };

  const padding = {
    paddingRight: 5,
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">
              blogs
            </Link>
          </Nav.Link>
          {user && (
            <>
              <Navbar.Text className="me-2">
                Signed in as: <strong>{user.name}</strong>
              </Navbar.Text>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleLogout}
                data-testid="logout"
              >
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const App = () => {

  const user = useSelector((state) => state.user);
  console.log("user:", user);

  const blogs = useSelector((state) => state.blogs);
  console.log("blogs:", blogs);

  return (
    <Container>
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <Menu user={user} />
          <Routes>
            <Route path="/blogs" element={<Bloglist />} />
            <Route path="/users" element={<UserStats />} />
          </Routes>
        </div>
      )}
    </Container>
  );
};

export default App;
