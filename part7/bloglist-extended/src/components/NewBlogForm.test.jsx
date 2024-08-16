import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";
import blogService from "../services/blogs";

vi.mock("../services/blogs");

test("NewBlogForm submission correctly calls event handler", async () => {
  const createBlogMock = vi.fn();
  blogService.createBlog = createBlogMock;

  // Render the form with initial empty values
  render(
    <NewBlogForm
      user={userEvent.setup()}
      setUser={vi.fn()}
      errorMessage=""
      setErrorMessage={vi.fn()}
      blogs={[]}
      setBlogs={vi.fn()}
      toggleVisibility={vi.fn()}
      updateTrigger={false}
      setUpdateTrigger={vi.fn()}
    />,
  );

  // Simulate filling in and submitting form
  await userEvent.type(screen.getByTestId("title-input"), "Test Title");
  await userEvent.type(screen.getByTestId("author-input"), "Test Author");
  await userEvent.type(screen.getByTestId("url-input"), "http://newblog.com");
  await userEvent.click(screen.getByTestId("add-button"));

  expect(createBlogMock).toHaveBeenCalledWith({
    title: "Test Title",
    author: "Test Author",
    url: "http://newblog.com",
  });
});
