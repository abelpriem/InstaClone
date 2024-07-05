import { Post, User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrievePost(userId) {
    validate.id(userId, 'post id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return Post.find().populate('author', 'name').lean()
                // Con .populate() nos permite traernos a una propiedad (1) lo que le pidamos, si está referenciado (2)
                // Con .lean() nos traemos, en vez de el modelo de dato, SOLO el documento
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }
                        // Por si hubiera varios post del mismo author

                        delete post.__v

                        post.likes = post.likes.map(userObjectId => userObjectId.toString())
                        post.liked = post.likes.includes(userId)

                        post.fav = user.favs.some(postObjectId => postObjectId.toString() === post.id)
                    })

                    return posts
                })
        })
}

export default retrievePost
