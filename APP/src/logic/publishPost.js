import { validate, errors } from 'com'
import session from './session'
const { SystemError } = errors

// PUBLISH ALL POSTS

export default function publishPost(image, text) {
    validate.text(image, 'image')
    validate.text(text)

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, text })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/newpost`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}