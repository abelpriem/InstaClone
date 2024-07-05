import { validate, errors } from 'com'
import session from './session'
const { SystemError } = errors

// CHECK CHANGE EMAIL 

export default function changeUserEmail(newEmail, againNewEmail, password) {
    validate.email(newEmail, 'new email')
    validate.email(againNewEmail, 'confirm new email')
    validate.password(password)

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${String(session.token)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newEmail, againNewEmail, password })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/email`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}