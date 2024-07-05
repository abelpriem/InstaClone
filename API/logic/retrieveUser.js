import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveUser(userId) {
    validate.id(userId, "user id")

    return User.findById(userId, 'name').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            delete user._id
            return user
        })
}

export default retrieveUser