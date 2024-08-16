import { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";
import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";
import Notification from "./Notification";
import PropTypes from "prop-types";
import { loginUser } from "../reducers/UserReducer";
import { useSelector, useDispatch } from "react-redux";
import { initialiseBlogs } from "../reducers/BlogReducer";
import { Container, Button, ListGroup } from "react-bootstrap";

const Bloglist = () => {
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger re-fetching blogs

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const newBlogFormRef = useRef(); // useRef() returns a ref object with a single property, current, initially set to undefine

  //fetch all blogs
  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [updateTrigger]);

  //store logged-in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loginUser(user)); // Dispatch the action to set the user in Redux state
      blogService.setToken(user.token);
    }
  }, [dispatch, updateTrigger]);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes); // Clone and sort (blogs state is immutable)

  const blogForm = () => (
    <ListGroup style={{ marginBottom: "10px" }}>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateTrigger={updateTrigger}
          setUpdateTrigger={setUpdateTrigger}
        />
      ))}
    </ListGroup>
  );

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <Container>
      {user && (
        <div>
          <h1>Blogs</h1>
          <Notification />
          {blogForm()}
          <Togglable
            buttonLabel="Add blog"
            ref={newBlogFormRef}
            data-testid="add_blog"
          >
            <NewBlogForm
              user={user}
              blogs={blogs}
              toggleVisibility={() => newBlogFormRef.current.toggleVisibility()}
              updateTrigger={updateTrigger}
              setUpdateTrigger={setUpdateTrigger}
            />
          </Togglable>
        </div>
      )}
    </Container>
  );
};

export default Bloglist;
