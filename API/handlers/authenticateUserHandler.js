import jwt from 'jsonwebtoken'
import logic from '../logic/index.js'
import { errors } from 'com'

const { NotFoundError, ContentError } = errors

export default (req, res) => {
    try {
        const { email, password } = req.body

        logic.authenticateUser(email, password)
            .then(userId => {
                // Creamos el token con jwt, desarrollamos la firma digital mediante el secreto y añadimos una expiración de 1 hora
                const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

                res.json(token)
            })
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
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}