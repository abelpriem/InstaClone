import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import changeEmailUser from './changeEmailUser.js'
import random from './helpers/random.js'
import { errors } from 'com'
const { CredentialsError, NotFoundError } = errors
import { User } from '../data/models.js'

dotenv.config()
const { ObjectId } = Types

describe('changeEmailUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))
    beforeEach(() => User.deleteMany())

    // CASO POSITIVO - OK
    it('success with change email user', async () => {
        const newEmail = random.email()

        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const value = await changeEmailUser(user.id, newEmail, newEmail, user.password)
        
        expect(value).to.be.undefined
    })

    // CASO NEGATIVO - Not Found
    it('fails on user not found', async () => {
        const newEmail = random.email()
        const password = random.password()

        try {
            await changeEmailUser(new ObjectId().toString(), newEmail, newEmail, password)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    // CASO NEGATIVO - Wrong password
    it('fails on wrong password', async () => {
        const newEmail = random.email()
        const otherPassword = random.password()

        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })

        try {
            await changeEmailUser(user.id, newEmail, newEmail, otherPassword)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong credentials')
        }
    })

    // CASO NEGATIVO - Email's diferents
    it('fails between new email and confirmation', async () => {
        const newEmail = random.email()
        const otherEmail = random.email()

        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        
        try {
            await changeEmailUser(user.id, newEmail, otherEmail, user.password)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('new email and confirm are not the same')
        }
    })

    after(() => mongoose.disconnect())
})