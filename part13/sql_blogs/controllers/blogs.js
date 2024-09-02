const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog } = require('../models')
const { User } = require('../models')
const sessionValidator = require('./sessionvalidator')


router.get('/', async (req, res, next) => {

  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title :{[Op.iLike]: `%${req.query.search}%`}
        },
        {
          author: {[Op.iLike]: `%${req.query.search}%`}
        }
      ]
    } 
  }
  
  const blogs = await Blog.findAll({
    where, 
    order: [['likes', 'DESC']]
  })
  res.json(blogs)

  })
  
router.post('/', sessionValidator, async (req, res, next) => {
  const user = await User.findByPk(req.user.id)
  if (user) {
    try {
      const blog = await Blog.create({...req.body, userId: user.id})
      res.json(blog)
    } catch(error) {
          next(error)
      }
  } else {
    return res.status(401).json({error: 'user not found'})
  }

})
  
router.delete('/:id', sessionValidator, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const blogToDelete = await Blog.findByPk(req.params.id);
    if (!blogToDelete) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    if (blogToDelete.userId !== user.id) {
      return res.status(403).json({ error: 'You are not authorized to delete this blog post' });
    }

    await blogToDelete.destroy();
    res.status(204).json({ "blogdeleted": blogToDelete})

  } catch(error) {
    next(error)
    }
 })

router.put('/:id', async (req, res, next) => {
    try {
        const blogToUpdate = await Blog.findByPk(req.params.id)
        if (blogToUpdate) {
          blogToUpdate.likes += 1
          await blogToUpdate.save()
          res.json(blogToUpdate)
        } else {
            res.status(404).json({ error: 'Blog not found' }) 
          }
    } catch(error) {
        console.log("error.name:", error.name)
        next(error)
    }
  })

  module.exports = router