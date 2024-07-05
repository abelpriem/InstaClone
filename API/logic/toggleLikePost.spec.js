import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import toggleLikePost from './toggleLikePost.js'
import random from './helpers/random.js'
import { User, Post } from '../data/models.js'
import { errors } from 'com'
const { NotFoundError } = errors

const { ObjectId } = Types

dotenv.config()

describe('toogleLikePost', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => User.deleteMany())
    beforeEach(() => Post.deleteMany())

    // CASO POSITIVO
    it('succeeds on toggle like post', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const post = await Post.create({ author: user.id, image: random.image(), text: random.text() })
        
        await toggleLikePost(user.id, post.id)
        const post2 = await Post.findOne({ image: post.image })
        
        expect(post2.likes).to.be.an('array').that.has.lengthOf(1)
        expect(post2.likes[0].toString()).to.equal(user.id)
    })

    // CASO NEGATIVO - User Not Found
    it('fails on user not found', async () => {
        const userId = new ObjectId().toString()
        const post = await Post.create({ author: userId, image: random.image(), text: random.text() })
        
        try {
            await toggleLikePost(userId, post.id)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    // CASO NEGATIVO - Post Not Found
    it('fails on post not found', async () => {
        const postId = new ObjectId().toString()
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        
        try {
            await toggleLikePost(user.id, postId)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('post not found')
        }
    })

    after(() => mongoose.disconnect())
})
