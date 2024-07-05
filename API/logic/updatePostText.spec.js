import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import updatePostText from './updatePostText.js'
import random from './helpers/random.js'
import { Post, User } from '../data/models.js'
import { errors } from 'com'
const { NotFoundError } = errors

const { ObjectId } = Types

dotenv.config()

describe('updatePostText', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => User.deleteMany())
    beforeEach(() => Post.deleteMany())

    // CASO POSITIVO - Update Text
    it('succeeds on updating post text', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const post = await Post.create({ author: user.id, image: random.image(), text: random.text() })
        
        await updatePostText(user.id, post.id, 'new text')
        const post2 = await Post.findOne({ image: post.image })

        expect(post2.text).to.be.a('string')
        expect(post2.text).to.equal('new text')
    })

    // CASO NEGATIVO - User not found
    it('fails on user not found', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const post = await Post.create({ author: user.id, image: random.image(), text: random.text() })
        
        try {
            await updatePostText(new ObjectId().toString(), post.id, 'new text')
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    // CASO NEGATIVO - Post not found
    it('fails on post not found', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        await Post.create({ author: user.id, image: random.image(), text: random.text() })
        
        try {
            await updatePostText(user.id, new ObjectId().toString(), 'new text')
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('post not found')
        }
    })

    after(() => mongoose.disconnect())
})
