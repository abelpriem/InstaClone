import mongoose from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import authenticateUser from './authenticateUser.js'
import random from './helpers/random.js'
import { errors } from 'com'
const { CredentialsError, NotFoundError } = errors
import { User } from '../data/models.js'

dotenv.config()

describe('authenticateUser', () => {
    // Usamos describe() para inicializar la prueba testing con MOCHA
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))  // CONTECTAMOS MONGOOSE
    beforeEach(() => User.deleteMany())

    // CASO POSITIVO
    it('succeeds on correct credentials', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const hash = await bcrypt.hash(password, 8)
        const user =  await User.create({ name, email, password: hash })
        const userId = await authenticateUser(email, password)

        expect(userId).to.be.a('string')         // Que SEA un String
        expect(userId).to.have.lengthOf(24)      // Que TENGA 24 caracteres
        expect(userId).to.equal(user.id)         // Que sea IGUAL al id del user
    })

    // CASO NEGATIVO - EMAIL
    it('fails on wrong email', async () => {
        const email = random.email()
        const password = random.password()

        try {
            await authenticateUser(email, password)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)     // Que SEA un error del tipo NotFoundError
            expect(error.message).to.equal('user not found')  // Que SEA un error igual a 'user not found'
        }
    })

    // CASO NEGATIVO - PASSWORD
    it('fails on wrong password', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
    
        try {
            await authenticateUser(user.email, '12345678')
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)     // Que SEA un error del tipo CredentialsError
            expect(error.message).to.equal('wrong credentials')  // Que SEA un error igual a 'wrong credentials'
        }
    })

    after(() => mongoose.disconnect())  // DESCONECTAMOS MONGOOSE
})