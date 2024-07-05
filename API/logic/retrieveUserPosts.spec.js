import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import retrieveUserPosts from './retrieveUserPosts.js'
import random from './helpers/random.js'
import { Post, User } from '../data/models.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const { ObjectId } = Types

dotenv.config()

describe('retrieveUserPosts', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => User.deleteMany())
    beforeEach(() => Post.deleteMany())

    // CASO POSITIVO

    it('success with retrieve posts from user owner', async () => {
        const [user1, user2] = await Promise.all([
            User.create({ name: random.name(), email: random.email(), password: random.password() }),
            User.create({ name: random.name(), email: random.email(), password: random.password() })
        ])
        const [post1, post2, post3, post4] = await Promise.all([
                Post.create({ author: user1.id, image: random.image(), text: random.text() }),
                Post.create({ author: user1.id, image: random.image(), text: random.text() }),
                Post.create({ author: user1.id, image: random.image(), text: random.text() }),
                Post.create({ author: user2.id, image: random.image(), text: random.text() })
            ])
        const posts = await retrieveUserPosts(user2.id, user1.id)
        
        expect(posts).to.be.an('array')
        expect(posts).that.has.lengthOf(3)
        expect(posts[0].id).to.equal(post1.id)
        expect(posts[1].id).to.equal(post2.id)
        expect(posts[2].id).to.equal(post3.id)
    })

    // CASO NEGATIVO - User logged not found
    it('fails on logged user not found', async () => {
        const userLogged = new ObjectId().toString()
        const userOwner = new ObjectId().toString()

        const [post1, post2, post3] = await Promise.all([
            Post.create({ author: userLogged, image: random.image(), text: random.text() }),
            Post.create({ author: userOwner, image: random.image(), text: random.text() }),
            Post.create({ author: userOwner, image: random.image(), text: random.text() })
        ])
        
        try {
            await retrieveUserPosts(userLogged, userOwner)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('user not found')
        }
    })

    // CASO NEGATIVO - User posts owner not found
    it('fails on user posts owner not found', async () => {
        const userOwner = new ObjectId().toString()
        const userLogged = await User.create({ name: random.name(), email: random.email(), password: random.password() })

        const [post1, post2, post3] = await Promise.all([
                Post.create({ author: userLogged.id, image: random.image(), text: random.text() }),
                Post.create({ author: userOwner, image: random.image(), text: random.text() }),
                Post.create({ author: userOwner, image: random.image(), text: random.text() })
            ])
            
        try {
            await retrieveUserPosts(userLogged.id, userOwner)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('post owner doesnt exist')
        }
    })

    after(() => mongoose.disconnect())
})