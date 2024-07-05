import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function toggleFavPost(postId, userId) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')

    return Post.findById(postId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(post => {
            if (!post) {
                throw new NotFoundError('post not found')
            }

            return User.findById(userId)
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user) {
                        throw new NotFoundError('user not found')
                    }

                    const postIndex = user.favs.indexOf(postId)

                    if (postIndex < 0) {
                        user.favs.push(postId)
                    } else {
                        user.favs.splice(postIndex, 1)
                    }

                    return user.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(user => { })
                })
        })
}

export default toggleFavPost