import { Post, User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function togglePostComment(userId, postId, comment) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.text(comment, 'comment')

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

                    post.comments.push(comment)

                    post.save()
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}

export default togglePostComment