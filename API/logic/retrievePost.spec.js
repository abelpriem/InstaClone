import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import retrievePost from './retrievePost.js'
import random from './helpers/random.js'
import { Post, User } from '../data/models.js'
import { errors } from 'com'
const { NotFoundError } = errors
const { ObjectId } = Types

dotenv.config()

describe('retrievePosts', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => User.deleteMany())
    beforeEach(() => Post.deleteMany())

    // CASO POSITIVO
    it('succeeds on retrieve posts', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const post = await Post.create({ author: user.id, image: random.image(), text: random.text() })
        const posts = await retrievePost(user.id)
        
        expect(posts).to.be.an('array').that.has.lengthOf(1)
        expect(posts[0].id).to.equal(post.id)
    })

    // CASO NEGATIVO - User not found
    it('fails on user not found', async () => {
        const userId = new ObjectId().toString()
        await Post.create({ author: userId, image: random.image(), text: random.text() })
        
        try {
            await retrievePost(userId)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    after(() => mongoose.disconnect())
})