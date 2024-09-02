//get , post, put

const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { ReadingList } = require('../models')
const { Blog } = require('../models')
const { User } = require('../models')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        const token = authorization.substring(7);
        req.decodedToken = jwt.verify(token, SECRET)
  
      } catch {
        return res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
}

router.get('/', async (req, res, next) => {
    try {
        const readinglist = await ReadingList.findAll()
        res.json(readinglist)
    } catch (error) {
        next(error)
    }
})

router.post('/', tokenExtractor, async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id)
    console.log('user:', user)
    if (user) {
        try {
            const blogToAdd = await Blog.findByPk(req.body.id)
            const addedBlog = await ReadingList.create({
                read: false,
                title: blogToAdd.dataValues.title,
                blogId: blogToAdd.dataValues.id,
                userId: user.dataValues.id
            })
            res.json(addedBlog)
        }
        catch (error) {
            next(error)
        }
    } else {
        return res.status(404).json({ error: 'User not found' })
    }

})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id,
      {include: [{ 
        model: ReadingList,
        attributes: ['userId',],
      }]
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const blogToUpdate = await ReadingList.findByPk(req.params.id)
    if (blogToUpdate && blogToUpdate.userId === user.id) {
      if (req.body.read) {
        blogToUpdate.read = req.body.read
        await blogToUpdate.save()
        res.json(blogToUpdate)
      }
      else {
        return res.status(400).json({ error: 'Invalid request body'})
      }
    } else {
      return res.status(401).json({ error: 'You can only mark the blogs in your own reading list as read'})
    }
    
  } catch (error) {
    next(error)
  }
})


router.delete('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const blogToDelete = await ReadingList.findByPk(req.params.id);
        if (!blogToDelete) {
          return res.status(404).json({ error: 'Blog not found' });
        }

        await blogToDelete.destroy();
        res.status(204).send("blogdeleted")
    
      } catch(error) {
        next(error)
    }
})



module.exports = router

