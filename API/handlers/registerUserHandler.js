import logic from '../logic/index.js'
import { errors } from 'com'

const { DuplicityError, ContentError } = errors

export default (req, res) => {
    try {
        const { name, email, password } = req.body

        logic.registerUser(name, email, password)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 500

                if (error instanceof DuplicityError) {
                    status = 409
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 406
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}