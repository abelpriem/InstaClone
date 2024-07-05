import { validate, errors } from 'com'
import session from './session'
const { SystemError } = errors

// EDIT POST TEXT

export default function toggleEditPostText(postId, postText) {
    validate.text(postId, 'post id')
    validate.text(postText, 'post text')

    const req = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${String(session.token)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postText })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/newpost/${String(postId)}/edit`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}