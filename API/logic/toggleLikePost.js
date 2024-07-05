import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function toggleLikePost(userId, postId) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) {
                        throw new NotFoundError('post not found')
                    }

                    const userIndex = post.likes.indexOf(userId)

                    if (userIndex < 0) {
                        post.likes.push(userId)
                    } else {
                        post.likes.splice(userIndex, 1)
                    }

                    return post.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(post => { })
                })
        })
}

export default toggleLikePost