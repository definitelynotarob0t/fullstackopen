const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)
    return likesArray.length === 0 
    ?  0
    :likesArray.reduce(
        (accumulator, currentValue) => {
        return accumulator + currentValue}, 0
    )
}

const favouriteBlog = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)

    let currentHighest = 0
    let indexOfHighest = 0

    for (let i = 0; i < likesArray.length; i++) {
        if (likesArray[i] > currentHighest) {
            currentHighest = likesArray[i]
            indexOfHighest = i
        }
    }
    return blogs[indexOfHighest]?
    {
        title: blogs[indexOfHighest].title,
        author: blogs[indexOfHighest].author,
        likes: currentHighest,
    }
    : undefined
}

const mostBlogs = (blogs) => {
    const authorsArray = blogs.map(blog => blog.author)
    
    let tracker = {}
    authorsArray.forEach(author => {
        if (tracker[author]) {
            tracker[author] += 1;
        } else {
            tracker[author] = 1;
        }
    })

    let currentMost = 0
    let authorWithMost = ""
    for (const author in tracker) {
        if (tracker[author] > currentMost) {
            currentMost = tracker[author]
            authorWithMost = author
        }
    }
    return currentMost===0?
    {}
    : {
        author: authorWithMost,
        blogs: currentMost
    }
}

const mostLikes = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)

    let currentMax = 0
    let indexMax = 0
    for (let i = 0; i < likesArray.length; i++) {
        if (likesArray[i] > currentMax) {
            currentMax = likesArray[i]
            indexMax = i
        }
    }

    return blogs[indexMax] ?
    {
        author: blogs[indexMax].author,
        likes: blogs[indexMax].likes
    }
    :
    {}
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }