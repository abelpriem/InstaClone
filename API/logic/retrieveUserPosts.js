import { validate, errors } from 'com'
import { User, Post } from '../data/models.js'

const { SystemError, NotFoundError } = errors

function retrieveUserPosts(userId, userOwnerPostId) {
    validate.id(userId, 'user')
    validate.id(userOwnerPostId, 'post owner')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return User.findById(userOwnerPostId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(ownerPost => {
                    if (!ownerPost) {
                        throw new NotFoundError('post owner doesnt exist')
                    }

                    return Post.find( { author: userOwnerPostId }).populate('author', 'name').lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(posts => {
                            posts.forEach(post => {
                                post.id = post._id.toString()
                                delete post._id

                                delete post.__v

                                if (post.author._id) {
                                    post.author.id = post.author._id.toString()
                                    delete post.author._id  
                                }

                                post.likes = post.likes.map(userObjectId => userObjectId.toString())
                                post.liked = post.likes.includes(userOwnerPostId)

                                post.fav = user.favs.some(postObjectId => postObjectId.toString() === post.id)
                            })

                            return posts
                        })
                })
        })
}

export default retrieveUserPosts

