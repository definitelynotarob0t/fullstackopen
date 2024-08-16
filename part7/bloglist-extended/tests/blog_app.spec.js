const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('api/users', {
      data: {
        username: 'pwright',
        name: 'Play Wright',
        password: 'salainen'
        }
      })

    await request.post('api/users', {
      data: {
        username: 'user2',
        name: 'Second User',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
    })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log-in to application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'pwright', 'salainen')
      await expect(page.getByText('logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'pwright', 'wrong')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Play Wright logged in')).not.toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'pwright', 'salainen')
      await expect(page.getByText('Play Wright logged-in')).toBeVisible()

      const blogToAdd = {
        title: "Adding a blog through Playwright",
        author: "FullStackOpen",
        url: "https://fullstackopen.com/en/part5/end_to_end_testing_playwright"
      }
      await createBlog(page, blogToAdd)
      await page.locator('.success')
    })
    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText("New blog created: Adding a blog through Playwright")).toBeVisible()
      await expect(page.getByText('Adding a blog through Playwright -- by FullStackOpen')).toBeVisible()
    })

    test('a new blog can be liked', async ({ page }) => {
      await page.getByTestId('view').click()
      await page.getByTestId('like').click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('a blog can be removed by user who created it', async ({ page }) => {
      await page.getByTestId('view').click()
      await page.getByTestId('remove').click()

      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Remove "Adding a blog through Playwright"?')
        await dialog.accept() // Accept the dialog to confirm deletion
      })

      await expect(page.getByTestId('Adding a blog through Playwright -- by FullStackOpen')).not.toBeVisible();
    })

    test('a blog can only be removed by its creator', async ({ page }) => {
      await page.getByTestId('logout').click()
      
      await expect(page.getByText('Log-in to application')).toBeVisible()
      await loginWith(page, "user2", "salainen")
      await expect(page.getByText('Second User logged-in')).toBeVisible()

      await page.getByTestId('view').click()
      await expect(page.getByTestId('remove')).not.toBeVisible()
    })

    test('blogs are arranged according to likes', async ({ page }) => {
      await page.getByTestId('logout').click()

      await loginWith(page, "user2", "salainen")
      await expect(page.getByText('Second User logged-in')).toBeVisible()
     
      // user2 adds a second blog
      const topBlog = {
        title: "This blog will have the most likes",
        author: "FullStackOpen",
        url: "https://popularblogpost.com"
      }
      await createBlog(page, topBlog)
      const newestBlog = await page.locator('.blogDefault').filter({ hasText: topBlog.title })

      await newestBlog.locator('button[data-testid="view"]').click()

      // user2 likes blog - their blog is then the most liked on page
      await page.getByTestId('like').click()
      await expect(page.getByText('likes: 1')).toBeVisible()


      // user2's blog is currently at bottom, refreshing page brings it to top
      await page.reload()

      const firstBlog = page.locator('.blogDefault').first()
      await expect(firstBlog).toBeVisible();
      await expect(firstBlog).toHaveText(/This blog will have the most likes -- by FullStackOpen/)
    })
  })
})
