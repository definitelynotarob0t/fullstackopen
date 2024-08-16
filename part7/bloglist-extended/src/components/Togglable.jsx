import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false); // Initially, form isn't visible

  const hideWhenVisible = { display: visible ? "none" : "" }; // display property set to 'none' hides element...  display property set to '' shows element
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    // useImperativeHandle is used for defining functions in a component, which can be invoked from outside of the component, i.e. in NewBlogForm
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <ButtonGroup>
          <Button
            className="m-2"
            variant="secondary"
            onClick={toggleVisibility}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
});

export default Togglable;
