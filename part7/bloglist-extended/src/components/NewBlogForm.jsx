import { useState } from "react";
import { notify } from "../reducers/NotificationReducer";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/BlogReducer";
import {
  Button,
  ButtonGroup,
  Row,
  Col,
  Container,
  Form,
} from "react-bootstrap";

const NewBlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleBlogCreation = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        createBlog({
          title,
          author,
          url,
        }),
      );

      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(notify(`New blog created: ${title}`));
      props.toggleVisibility(); // Closes new blog form after creation
    } catch (error) {
      console.error("Error creating blog:", error);
      dispatch(notify("Invalid blog"));
    }
  };

  return (
    <Container>
      <Form onSubmit={handleBlogCreation} className="newBlogForm">
        <h2>Add new blog</h2>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            data-testid="title-input"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            style={{ width: "330px" }}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            data-testid="author-input"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            style={{ width: "330px" }}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            data-testid="url-input"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            style={{ width: "330px" }}
          />
        </Form.Group>
        <div>
          <Row>
            <Col>
              <ButtonGroup className="mt-2">
                <Button data-testid="add-button" type="submit">
                  Add
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
      </Form>
    </Container>
  );
};

export default NewBlogForm;
