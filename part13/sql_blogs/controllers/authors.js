const router = require('express').Router()
const { sequelize } = require('../util/db')

const { Blog } = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const authors = await Blog.findAll(
            {attributes: [
                'author', 
                [sequelize.fn('COUNT', sequelize.col("likes")), 'total_likes'],
                [sequelize.fn('COUNT', sequelize.col("title")), 'total_articles']
            ],
            group: ['author'],
            order: [['total_likes', 'DESC']]
        });
        res.json(authors)
    } catch (error) {
        next(error)
    }
  })
  

module.exports = router

