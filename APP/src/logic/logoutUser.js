import { validate } from 'com'
import session from './session'

// LOGOUT USER

export default function logoutUser(callback) {
    validate.function(callback, 'callback')

    session.token = null
    session.sessionUserId = null

    callback(null)
}