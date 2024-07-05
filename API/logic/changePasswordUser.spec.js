import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import changePasswordUser from './changePasswordUser.js'
import random from './helpers/random.js'
import { errors } from 'com'
const { CredentialsError, NotFoundError } = errors
import { User } from '../data/models.js'

dotenv.config()

const { ObjectId } = Types

describe('changePasswordUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))
    beforeEach(() => User.deleteMany())

    // CASO POSITIVO
    it('succeeds with change user password', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const newPassword = random.password()
        const againNewPassword = newPassword

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash })
        const value = await changePasswordUser(user.id, password, newPassword, againNewPassword)

        expect(value).to.be.undefined

        const match = await bcrypt.compare(password, user.password)

        expect(match).to.be.true
    })

    // CASO NEGATIVO - Not Found
    it('fails on user not found', async () => {
        const password = random.password()
        const newPassword = random.password()

        try {
            await changePasswordUser(new ObjectId().toString(), password, newPassword, newPassword)

            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    // CASO NEGATIVO - Wrong credentials
    it('fails on wrong password', async () => {
        const wrongPassword = random.password()
        const newPassword = random.password()

        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })

        try {
            await changePasswordUser(user.id, wrongPassword, newPassword, newPassword)

            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong credentials')
        }
    })

    // CASO NEGATIVO - Error with confirmation
    it('fails between new password and confirmation', async () => {
        const password = random.password()
        const newPassword = random.password()
        const wrongPassword = random.password()

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name: random.name(), email: random.email(), password: hash })

        try {
            await changePasswordUser(user.id, password, newPassword, wrongPassword)

            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong credentials with new password')
        }
    })

    after(() => mongoose.disconnect())
})