import registerUser from './registerUser'
import loginUser from './loginUser'
import retrieveUser from './retrieveUser'
import changeUserEmail from './changeUserEmail'
import changeUserPassword from './changeUserPassword'
import logoutUser from './logoutUser'
import isUserLoggedIn from './isUserLoggedIn'

import publishPost from './publishPost'
import retrievePosts from './retrievePosts'
import retrieveUserPosts from './retrieveUserPosts'
import retrieveFavUserPosts from './retrieveFavUserPosts'
import deletePost from './deletePost'
import toggleFavPost from './toggleFavPost'
import toggleLikePost from './toggleLikePost'
import toggleEditPostText from './toggleEditPostText'
import toggleCommentPost from './toggleCommentPost'

const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    changeUserEmail,
    changeUserPassword,
    logoutUser,
    isUserLoggedIn,

    publishPost,
    retrievePosts,
    retrieveFavUserPosts,
    retrieveUserPosts,
    deletePost,
    toggleFavPost,
    toggleLikePost,
    toggleEditPostText,
    toggleCommentPost
}

export default logic