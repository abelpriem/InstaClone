import logic from '../logic'
import Post from './Post'
import Context from '../Context'

import { useState, useEffect, useContext } from 'react'

// POSTS
function Posts({ loadPosts, stamp }) {
    console.log('Posts')

    // STATE ID & CONTEXT
    const [posts, setPosts] = useState([])
    const { handleError } = useContext(Context)

    // REFRESH POSTS
    const refreshPosts = () => {
        try {
            loadPosts()
                .then(posts => {
                    posts.reverse()
                    setPosts(posts)
                })
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    // STATE & EFFECT - ID USER
    useEffect(() => {
        console.log('Posts Effect')

        try {
            logic.retrieveUser()
                .then(() => refreshPosts())
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }, [stamp])

    // TEMPLATE
    return <div className="container">
        {posts.map(post => <Post key={post.id} post={post} onToggleLikeClick={refreshPosts} onToggleFavClick={refreshPosts} onDeletePost={refreshPosts} onEditText={refreshPosts} onSendComment={refreshPosts} />)}
    </div>
}

export default Posts