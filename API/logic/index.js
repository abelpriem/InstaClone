import authenticateUser from './authenticateUser.js'
import changeEmailUser from './changeEmailUser.js'
import changePasswordUser from './changePasswordUser.js'
import createPost from './createPosts.js'
import deletePost from './deletePost.js'
import registerUser from './registerUser.js'
import retrieveFavs from './retrieveFavs.js'
import retrievePost from './retrievePost.js'
import retrieveUser from './retrieveUser.js'
import retrieveUserPosts from './retrieveUserPosts.js'
import toggleFavPost from './toggleFavPost.js'
import toggleLikePost from './toggleLikePost.js'
import togglePostComment from './togglePostComment.js'
import updatePostText from './updatePostText.js'

const logic = {
    authenticateUser,
    changeEmailUser,
    changePasswordUser,
    createPost,
    deletePost,
    registerUser,
    retrieveFavs,
    retrievePost,
    retrieveUser,
    retrieveUserPosts,
    toggleFavPost,
    toggleLikePost,
    togglePostComment,
    updatePostText
}

export default logic