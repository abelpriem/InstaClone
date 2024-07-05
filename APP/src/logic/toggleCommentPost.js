import session from './session'
import { validate, errors } from 'com'
const { SystemError } = errors

// COMMENT TEXT POSTS

export default function toggleCommentPostText(postId, postComment) {
    validate.text(postId, "post id")
    validate.text(postComment, "comment")

    const req = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${String(session.sessionUserId)}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ postComment })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/newpost/${String(postId)}/comments`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}