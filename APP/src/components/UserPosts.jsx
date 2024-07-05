import Context from '../Context'
import Post from './Post'
import logic from '../logic'

import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function UserPosts({ stamp, name }) {
    const params = useParams()

    // STATE ID & CONTEXT
    const [posts, setPosts] = useState([])
    const { handleError } = useContext(Context)

    // REFRESH POSTS
    const refreshPosts = () => {
        try {
            logic.retrieveUserPosts(params.userId)
                .then(posts => {
                    posts.reverse()
                    setPosts(posts)
                })
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        console.log('Posts from owner')

        refreshPosts()
    }, [stamp])

    return <>
        <h2>All posts from {params.userId}</h2>

        <div className='post'>
            {posts.map(post => <Post key={post.id} post={post} onToggleLikeClick={refreshPosts} onToggleFavClick={refreshPosts} onDeletePost={refreshPosts} onEditText={refreshPosts} onSendComment={refreshPosts} />)}
        </div>
    </>
}

export default UserPosts