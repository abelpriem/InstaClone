import { validate, errors } from 'com'
import session from './session'
const { SystemError } = errors

// CHECK CHANGE PASSWORD 

export default function changeUserPassword(password, newPassword, againNewPassword) {
    validate.password(password)
    validate.password(newPassword, 'new password')
    validate.password(againNewPassword, 'repeat password')

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${String(session.token)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, newPassword, againNewPassword })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/password`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}