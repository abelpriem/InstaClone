import bcrypt from 'bcrypt'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, CredentialsError } = errors

function authenticateUser(email, password) {
    validate.email(email, 'name')
    validate.password(password, 'password')

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        { throw new CredentialsError('wrong credentials') }
                    }

                    return user.id
                })
        })
}

export default authenticateUser