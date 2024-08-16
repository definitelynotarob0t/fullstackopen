import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import blogService from "../services/blogs";

vi.mock("../services/blogs");

test("by default - renders title and author of blogs, not URL or likes", () => {
  const blog = {
    title: "Component testing with react-testing-library",
    author: "Vite Test",
    url: "https://fullstackopen.com/en/part5/testing_react_apps",
    likes: 0,
    user: {
      name: "testing",
      username: "newuser",
      id: "66a9811d297711e9c80261ab",
    },
  };

  const { container } = render(<Blog blog={blog} user={blog.user} />);

  const div = container.querySelector(".blogDefault");

  expect(div).toHaveTextContent("Component testing with react-testing-library");
  expect(div).toHaveTextContent("Vite Test");
  expect(div).not.toHaveTextContent(
    "https://fullstackopen.com/en/part5/testing_react_apps",
  );
  expect(div).not.toHaveTextContent("likes: 0");
});

test("clicking the view button shows blogs' likes and URL", async () => {
  const blog = {
    title: "Component testing with react-testing-library",
    author: "Vite Test",
    url: "https://fullstackopen.com/en/part5/testing_react_apps",
    likes: 0,
    user: {
      name: "testing",
      username: "newuser",
      id: "66a9811d297711e9c80261ab",
    },
  };

  const { container } = render(<Blog blog={blog} user={blog.user} />);
  expect(container.querySelector(".blogDetailed")).toBeNull(); // Verify that the detailed view is not visible initially

  // Simulate user clicking 'view'
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".blogDetailed");
  expect(div).toBeInTheDocument();
  expect(div).toHaveTextContent(
    "https://fullstackopen.com/en/part5/testing_react_apps",
  );
  expect(div).toHaveTextContent("likes: 0");
});

test("if 'like' button is clicked twice, event handler is called twice", async () => {
  const blog = {
    title: "Component testing with react-testing-library",
    author: "Vite Test",
    url: "https://fullstackopen.com/en/part5/testing_react_apps",
    likes: 0,
    user: {
      name: "testing",
      username: "newuser",
      id: "66a9811d297711e9c80261ab",
    },
  };

  // Mock the updateBlog implementation to just return the updated blog object
  blogService.updateBlog.mockResolvedValue({
    ...blog,
    likes: blog.likes + 1,
  });
  render(<Blog blog={blog} user={blog.user} />);

  // Simulate user clicking 'view'
  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  //Simulate user clicking 'like' twice
  const likeButton = screen.getByRole("button", { name: "like" });
  await user.click(likeButton);
  await user.click(likeButton);

  expect(blogService.updateBlog).toHaveBeenCalledTimes(2);
});
