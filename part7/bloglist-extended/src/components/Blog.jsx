import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, remove } from "../reducers/BlogReducer";
import { Button, ListGroupItem } from "react-bootstrap";

const Blog = ({ blog, user, updateTrigger, setUpdateTrigger }) => {
  const [visible, setVisible] = useState(false); // Initially, details aren't visible

  const dispatch = useDispatch();

  const hideWhenVisible = { display: visible ? "none" : "" }; // display property set to 'none' hides element...  display property set to '' shows element
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleClick = async () => {
    await dispatch(likeBlog(blog));
  };

  const confirmDelete = async () => {
    if (window.confirm(`Remove "${blog.title}"?`)) {
      await dispatch(remove(blog));
      setUpdateTrigger(!updateTrigger); // Toggle the state to trigger re-fetching blogs
    }
  };

  return (
    <ListGroupItem>
      {/* li class="list-group-item */}
      <div
        class="list-group-item"
        style={hideWhenVisible}
        className="blogDefault"
      >
        {blog.title} -- by {blog.author}{" "}
        <Button
          variant="info"
          onClick={toggleVisibility}
          data-testid="view"
          size="sm"
        >
          {" "}
          view
        </Button>
      </div>
      {visible && (
        <div style={showWhenVisible} className="blogDetailed">
          <div>
            {blog.title} -- by {blog.author}{" "}
            <Button variant="outline-dark" onClick={toggleVisibility} size="sm">
              {" "}
              hide
            </Button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{" "}
            <Button
              variant="outline-success"
              onClick={handleClick}
              data-testid="like"
              size="sm"
            >
              like
            </Button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.name === user.name && (
            <Button
              variant="danger"
              onClick={confirmDelete}
              data-testid="remove"
              size="sm"
            >
              remove
            </Button>
          )}
          {console.log(
            "blog.user.name:",
            blog.user.name,
            "user.name:",
            user.name,
          )}
        </div>
      )}
    </ListGroupItem>
  );
};

export default Blog;
