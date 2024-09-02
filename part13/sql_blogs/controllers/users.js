const router = require('express').Router()

const { User } = require('../models')
const { Blog } = require('../models')
const { ReadingList } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
        }
        })
    res.json(users)
})

router.get('/:id', async (req, res, next) => {
    try {
        let readFilter = req.query.read;

        let readingListWhere = {};
        if (readFilter = 'true') {
            readingListWhere.read = true
        } else if (readFilter = 'false') {
            readingListWhere.read = false
        }


        // Find the user with associated ReadingLists
        const user = await User.findOne({
            where: { id: req.params.id },
            attributes: ['name', 'username'],
            include: [{ 
                model: ReadingList,
                where: readingListWhere,
                attributes: ['id', 'title', 'read', 'blogId'],
            }]
        });    
       
        if (user) {
            // Map over the user's ReadingLists to find the associated Blog details
            const readings = await Promise.all(user.ReadingLists.map(async (list_item) => {
                const blog = await Blog.findOne({
                    where: { id: list_item.blogId },
    
                    attributes: ['id', 'url', 'title', 'author', 'likes', 'year']
                });
                return {
                    id: blog.id,
                    url: blog.url,
                    title: blog.title,
                    author: blog.author,
                    likes: blog.likes,
                    year: blog.year,
                    readinglists: [ {
                        read: list_item.read,
                        id: list_item.id
                    }]
                };
            }));

            const response = {
                name: user.name,
                username: user.username,
                readings: readings,
            };

            res.json(response);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res, next) => {
    const userToUpdate = await User.findOne({ where: { username: req.params.username }})
    if (userToUpdate) {
        userToUpdate.username = req.body.username
        try {
            await userToUpdate.save()
            res.json(userToUpdate)
        } catch (error) {
            next(error)
        }          
    } else {
        res.status(400).json({error})
    }
})

module.exports = router
