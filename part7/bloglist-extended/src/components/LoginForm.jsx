import { useState, useEffect, useRef } from "react";
import Notification from "./Notification";
import { setUser } from "../reducers/UserReducer";
import { useDispatch } from "react-redux";
import { notify } from "../reducers/NotificationReducer";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(setUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(notify("Wrong username or password"));
    }
  };

  const margin = {
    marginTop: 10,
  };

  return (
    <Container
      fluid
      className="d-flex vh-100 align-items-center justify-content-center"
    >
      <Row className="justify-content-center">
        <Col>
          <h1 style={margin}>
            <strong>Login</strong>
          </h1>
          <Notification />
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <div>
                <Form.Label>username</Form.Label>
                <Form.Control
                  data-testid="username"
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
            </Form.Group>
            <div>
              <Form.Label style={margin}>password</Form.Label>
              <Form.Control
                data-testid="password"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              data-testid="login"
              style={margin}
            >
              login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
