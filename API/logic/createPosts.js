import { Post, User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function createPosts(userId, image, text) {
    validate.id(userId, "user")
    validate.text(image, "image")
    validate.text(text, "text")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return Post.create({ author: userId, image, text })
                .catch(error => { throw new SystemError(error.message) })
                .then(post => { })
        })
}

export default createPosts