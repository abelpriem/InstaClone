import { validate, errors } from 'com'
import session from './session'
const { SystemError } = errors

// DELETE POST (PENDIENTE)

export default function deletePost(postId) {
    validate.text(postId, 'post id')

    const req = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${String(session.token)}`
        }
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/${String(postId)}/favs`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}