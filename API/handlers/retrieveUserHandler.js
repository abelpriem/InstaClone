import jwt from 'jsonwebtoken'
import logic from '../logic/index.js'
import { errors } from 'com'

const { JsonWebTokenError } = jwt
const { NotFoundError, ContentError, TokenError } = errors

export default (req, res) => {
    try {
        const token = req.headers.authorization.substring(7)
        // Recogemos en la cabecera el elemento solicitado en GET con el Authorization
        // Mediante el .substring() indicamos con número el carácter donde empieza el contenido/dato

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)
        // Con jwt.verify() comprobamos que el token que recibimos coincide con la secret word
        // Rescatamos la propiedad sub del payload que contiene el userId

        logic.retrieveUser(userId)
            .then(user => res.json(user))
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError) {
                    status = 404
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 406
        } else if (error instanceof JsonWebTokenError) {
            status = 401

            error = new TokenError(error.message)
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}