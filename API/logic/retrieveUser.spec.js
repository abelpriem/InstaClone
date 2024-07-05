import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import retrieveUser from './retrieveUser.js'
import random from './helpers/random.js'
import { errors } from 'com'
const { NotFoundError } = errors
import { User } from '../data/models.js'

const { ObjectId } = Types

dotenv.config()

describe('retrieveUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))
    beforeEach(() => User.deleteMany())

    // CASO POSITIVO
    it('succeeds on retrieve user', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const user1 = await retrieveUser(user.id)
        
        expect(user1.name).to.be.a('string')
        expect(user1.name).to.equal(user.name)
        expect(user1.id).to.be.undefined
        expect(user1.email).to.be.undefined
        expect(user1.password).to.be.undefined
    })

    // CASO NEGATIVO - Not Found
    it('fails on user not found', async () => {
        try {
            await retrieveUser(new ObjectId().toString())
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    after(() => mongoose.disconnect())
})