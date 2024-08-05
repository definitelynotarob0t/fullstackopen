const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByTestId('login').click()
}

const createBlog = async (page, blog) => {
    const add_button = page.getByRole('button', { name: /add blog/i })
    if (add_button.isVisible()) {
        await add_button.click()
    }
    
    await page.getByTestId('title-input').fill(blog.title)
    await page.getByTestId('author-input').fill(blog.author)
    await page.getByTestId('url-input').fill(blog.url)

    await page.getByTestId('add-button').click()
}

export { loginWith, createBlog }

  