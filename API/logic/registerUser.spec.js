import mongoose from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import registerUser from './registerUser.js'
import { errors } from 'com'
const { DuplicityError } = errors
import { User } from '../data/models.js'
import random from './helpers/random.js'

dotenv.config()

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))
    beforeEach(() => User.deleteMany())

    // CASO POSITIVO
    it('succeeds on register NEW user', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        await registerUser(name, email, password)
        const user = await User.findOne({ email: email })

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.email).to.equal(email)

        const match = await bcrypt.compare(password, user.password)

        expect(match).to.be.true
    })

    // CASO NEGATIVO - USER ALREADY EXIST
    it('fails on already existing user', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        
        try {
            await registerUser(user.name, user.email, user.password)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal('user already exist')
        }
    })

    after(() => mongoose.disconnect())
})