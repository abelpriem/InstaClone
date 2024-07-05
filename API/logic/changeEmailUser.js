import bcrypt from 'bcrypt'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, CredentialsError } = errors

function changeEmailUser(userId, newEmail, againNewEmail, password) {
    validate.id(userId, "user id")
    validate.email(newEmail, "newEmail")
    validate.email(againNewEmail, "newEmail")
    validate.password(password, "password")

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            if (newEmail !== againNewEmail) {
                throw new CredentialsError('new email and confirm are not the same')
            }

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        throw new CredentialsError('wrong credentials')
                    }

                    user.email = newEmail

                    user.save()
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}

export default changeEmailUser