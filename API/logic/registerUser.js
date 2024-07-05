import bcrypt from 'bcrypt'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, DuplicityError } = errors

function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email, 'email')
    validate.password(password, 'password')

    // El 8 corresponde a los saltos de encriptación
    return bcrypt.hash(password, 8)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            return User.create({ name, email, password: hash })
                .catch(error => {
                    if (error.code === 11000) {
                        throw new DuplicityError('user already exist')
                    }

                    throw new SystemError(error.message)
                })
                .then(user => { })
            // Le pasamos un objeto vacío para indicar a la promesa que no hay nada que devolver fuera!
        })
}

export default registerUser