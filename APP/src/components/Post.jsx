import logic from '../logic'
import session from '../logic/session'
import Context from '../Context'

import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '../librery'
import { Link } from 'react-router-dom'


function Post(props) {
    const post = props.post

    const { handleError } = useContext(Context)
    const navigate = useNavigate()

    // STATE EDIT MODE & COMMENT TEXT
    const [editMode, setEditMode] = useState(false)
    const [inputBorder, setInputBorder] = useState('solid');
    const [name, setName] = useState(null)

    const [commentText, setCommentText] = useState('')

    // STATE & EFFECT - NAME
    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(user => setName(user.name)) // Guardamos en STATE el user para usar el "NAME"
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }, [])



    // LIKE POST BUTTON
    function handleToggleLikeClick() {
        try {
            logic.toggleLikePost(post.id)
                .then(() => props.onToggleLikeClick())
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    // FAV POST BUTTON
    function handleToggleFavButtonClick() {
        try {
            logic.toggleFavPost(post.id)
                .then(() => props.onToggleFavClick())
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    // DELETE POST BUTTON
    function handleToggleDeleteButtonClick(postId) {
        if (confirm('Are you sure that you want to delete this post?')) {
            try {
                logic.deletePost(postId)
                    .then(() => props.onDeletePost())
                    .catch(error => handleError(error))
            } catch (error) {
                handleError(error)
            }
        }

        return
    }

    // EDIT TEXT(POST) CLICK
    function handleToggleEditClick() {
        try {
            setEditMode(!editMode)

        } catch (error) {
            handleError(error)
        }
    }

    // EDIT TEXT(POST) INPUT
    function handleToggleInputEditClick(postId, postText) {
        try {
            const text = document.querySelector("#post-tittle").value

            postText = text

            logic.toggleEditPostText(postId, postText)
                .then(() => {
                    // Hacemos un repintado de los posts-favs
                    props.onEditText()

                    setEditMode(!editMode)
                })
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    // SEND POST COMMENTS
    function handleToggleCommentClick(postId) {
        try {
            const postComment = document.querySelector("#text-comment").value

            logic.toggleCommentPost(postId, postComment)
                .then(() => {
                    props.onSendComment()
                    // Hacemos un repintado de los posts-favs

                    setInputBorder('none');
                    // Quitamos el borde del input por defecto

                    setCommentText('comment')
                })
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    // LINK ON THAT USER POSTS
    function handleUserPosts(event) {
        event.preventDefault()

        navigate(`/users/${post.author.id}/posts`)
    }

    // TEMPLATE
    return <>
        <article className="post">
            <h2><Link onClick={handleUserPosts}>{post.author.name}</Link></h2>
            <img className='post-img' src={post.image} />
            <div className="buttons-edit">
                <p>{post.text}</p>
                {post.author.id === session.sessionUserId && <Button onClick={handleToggleEditClick}>✏</Button>}
                {editMode === true &&
                    <div>
                        <Input id={'post-tittle'}></Input>
                        <Button onClick={() => handleToggleInputEditClick(post.id, post.text)}>Done</Button>
                    </div>}
            </div>
            {<div>
                {post.comments.length
                    ? <p>{name + ": " + post.comments + "  -  " + new Date().toLocaleDateString()}</p>
                    : <input className="post-comments" id="text-comment" placeholder="Escribe un comentario" type="text" style={{ borderStyle: inputBorder }}></input>}
            </div>}
            <div className="buttons-post">
                <Button onClick={handleToggleLikeClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length} likes</Button>
                <Button onClick={() => handleToggleCommentClick(post.id)}>🗨</Button>
                <Button onClick={handleToggleFavButtonClick}>{post.fav ? '⭐' : '☆'}</Button>
                {post.author.id === session.sessionUserId && (<Button onClick={() => handleToggleDeleteButtonClick(post.id)}>Delete post</Button>)}
            </div>
        </article >
    </>
}

export default Post