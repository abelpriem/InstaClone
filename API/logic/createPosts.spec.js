import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import createPosts from './createPosts.js'
import random from './helpers/random.js'
import { errors } from 'com'
const { NotFoundError } = errors
import { Post, User } from '../data/models.js'

dotenv.config()
const { ObjectId } = Types

describe("createPosts", () => {
  before(() => mongoose.connect(process.env.TEST_MONGODB_URL))
  beforeEach(() => Post.deleteMany())
  beforeEach(() => User.deleteMany())

  // CASO POSITIVO
  it("succeeds on create NEW post", async () => {
    const image = random.image()
    const text = random.text()

    const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
    await createPosts(user.id, image, text)
    const post = await Post.findOne({ image: image })
    
    expect(post).to.exist
    expect(post.image).to.equal(image)
    expect(post.text).to.equal(text)
  })

  // CASO NEGATIVO - Not Found
  it("fails on user not found", async () => {
    const image = random.image()
    const text = random.text()

    try {
      await createPosts(new ObjectId().toString(), image, text)
      throw new Error("should not reach this point!")
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal("user not found")
    }
  })

  after(() => mongoose.disconnect())
})
