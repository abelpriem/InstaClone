import mongoose, { Types } from 'mongoose' 
import { expect } from 'chai'
import dotenv from 'dotenv'

import retrieveFavs from './retrieveFavs.js'
import { Post, User } from '../data/models.js'
import random from './helpers/random.js'
import { errors } from 'com'
const { NotFoundError } = errors

dotenv.config()
const { ObjectId } = Types

describe('retrieveFavs', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    // CASO POSITIVO - Retrieve Favs
    it('succeeds on retrieve fav posts', async () => {
        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        const post = await Post.create({ author: user.id, image: random.image(), text: random.text() })
        
        user.favs.push(post)

        const user2 = await user.save()
        const favs = await retrieveFavs(user2.id)
        
        expect(favs).to.be.an('array').that.has.lengthOf(1)
        expect(favs[0].id).to.equal(post.id)
    })

    // CASO NEGATIVO - User not found
    it('fails on user not found', async () => {
        const userId = new ObjectId().toString()

        await Post.create({ author: userId, image: random.image(), text: random.text() })
        
        try {
            await retrieveFavs(userId)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    after(() => mongoose.disconnect())
})
