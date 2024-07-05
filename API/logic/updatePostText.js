import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function updatePostText(userId, postId, postText) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.text(postText, 'text')

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

                    post.text = postText

                    return post.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(post => { })
                })
        })
}

export default updatePostText