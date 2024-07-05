import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import toggleFavPost from './toggleFavPost.js'
import random from './helpers/random.js'
import { Post, User } from '../data/models.js'
import { errors } from 'com'
const { NotFoundError } = errors

const { ObjectId } = Types

dotenv.config()

describe('toggleFavPost', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => User.deleteMany())
    beforeEach(() => Post.deleteMany())

    // CASO POSTIVO
    it('succeeds on toggle fav post', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const post = await Post.create({ author: user.id, image: random.image(), text: random.text() })
        
        await toggleFavPost(post.id, user.id)
        
        const user2 = await User.findOne({ email: user.email })
        
        expect(user2.favs).to.be.an('array').that.has.lengthOf(1)
        expect(user2.favs[0].toString()).to.equal(post.id)
    })

    // CASO NEGATIVO - Post not found
    it('fails on post not found', async () => {
        const postId = new ObjectId().toString()
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        
        try {
            await toggleFavPost(postId, user.id)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('post not found')
        }
    })

    // CASO NEGATIVO - User not found
    it('fails on user not found', async () => {
        const userId = new ObjectId().toString()
        const post = await Post.create({ author: userId, image: random.image(), text: random.text() })
        
        try {
            await toggleFavPost(post.id, userId)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    after(() => mongoose.disconnect())
})