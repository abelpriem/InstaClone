import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import deletePost from './deletePost.js'
import { errors } from 'com'
const { NotFoundError, RelationalError } = errors
import { Post, User } from '../data/models.js'
import random from './helpers/random.js'

dotenv.config()
const { ObjectId } = Types

describe('deletePost', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => Post.deleteMany())
    beforeEach(() => User.deleteMany())

    // CASO POSITIVO - Deleting post 
    it('succeeds on deleting a post and is on user fav', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const post = await Post.create({ author: user.id, image: random.image(), text: random.text() })
        
        user.favs.push(post.id)
        await user.save()
    
        await deletePost(user.id, post.id)

        const post2 = await Post.findById(post.id)
        const user2 = await User.findById(user.id)
        
        expect(post2).to.be.null  // .to.not.exist
        expect(user2.favs).to.have.lengthOf(0)
    })

    // CASO NEGATIVO - Not Found
    it('fails on post not found', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        await Post.create({ author: user.id, image: random.image(), text: random.text() })
    
        try {
            await deletePost(user.id, new ObjectId().toString())
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('post not found')
        }
    })

    it('fails on deleting post that does not belong to user', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const post = await Post.create({ author: new ObjectId, image: random.image(), text: random.text() })

        user.favs.push(post.id)
        await user.save()

        try {
            await deletePost(user.id, post.id)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(RelationalError)
            expect(error.message).to.equal('post does not belong to user')
        }
    })
        
    it('fails on user not found', async () => {
        const post = await Post.create({ author: new ObjectId, image: random.image(), text: random.text() })
        
        try {
            await deletePost(new ObjectId().toString(), post.id)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    after(() => mongoose.disconnect())
})
