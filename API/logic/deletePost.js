import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, RelationalError } = errors

function deletePost(userId, postId) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post) {
                throw new NotFoundError('post not found')
            }

            if (post.author.toString() !== userId)
                throw new RelationalError('post does not belong to user')

            return Post.findByIdAndDelete(postId)
                .then(() => {
                    return User.find({ 'favs': postId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(users => {
                            const deletions = users.map(user => {
                                const postFavIndex = user.favs.indexOf(postId)

                                user.favs.splice(postFavIndex, 1)

                                return user.save()
                            })

                            return Promise.all(deletions)
                                .catch(error => { throw new SystemError(error.message) })
                        })
                })
                .then(() => { })
        })
}

export default deletePost