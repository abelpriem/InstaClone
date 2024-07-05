import { validate, errors } from 'com'
import session from './session'
const { SystemError } = errors

// LOGIN & AUTHENTICATE USER

export default function loginUser(email, password) {
    validate.email(email)
    validate.password(password)

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(token => {
                    // Extraemos con .slice() el userId del formato B64 (base 64) del token
                    const payloadB64 = token.slice(token.indexOf('.') + 1, token.lastIndexOf('.'))
                    // Descodificamos los datos en B64 con el método atob()
                    const payloadJson = atob(payloadB64)
                    // Parseamos a formato JSON los datos decodificados
                    const payload = JSON.parse(payloadJson)
                    // El payload devuelve un objeto { sub: userId } con la propiedad sub
                    const userId = payload.sub

                    session.sessionUserId = userId
                    session.token = token
                })
        })

}