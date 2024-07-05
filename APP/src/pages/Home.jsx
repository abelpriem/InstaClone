import logic from '../logic'
import Context from '../Context'

import { Profile, NewPost, Posts, UserPosts } from '../components'
import { Button, Link } from '../librery'

import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

// HOME

function Home(props) {
    console.log('Home')

    const navigate = useNavigate()
    const location = useLocation()
    const { handleError } = useContext(Context)


    // STATE NAME (Profile) & STATE STAMP
    const [name, setName] = useState(null)
    const [stamp, setStamp] = useState(null)

    // STATE & EFFECT - NAME 
    useEffect(() => {
        console.log('Home -> Effect (NAME)')

        try {
            logic.retrieveUser()
                .then(user => setName(user.name)) // Guardamos en STATE el user para usar el "NAME"
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }, [])

    // LOGOUT
    function handleLogoutClick() {
        logic.logoutUser(error => {
            if (error) {
                handleError(error)

                return
            }
        })

        props.onLogoutClick()
        // Mediante 'props' nos traemos de APP la función de cambiar la vista a 'LOGIN'
    }

    // SETTINGS BUTTON
    function handleProfileClick(event) {
        event.preventDefault()

        navigate('/profile')
        // Cambiamos la vista a 'profile'
    }

    // HOME BUTTON
    function handleHomeClick(event) {
        event.preventDefault()

        navigate('/')
        window.scrollTo(0, 0)
    }

    // LIST FAVS POSTS 
    function handleFavsPostsClick() {
        navigate('/favs')
    }

    // NEW POST BUTTON
    function handleNewPostClick() {
        navigate('/newpost')
        window.scrollTo(0, 0)
    }

    // PUBLISH NEW POST
    function handleNewPostPublish() {
        setStamp(Date.now())
        navigate('/')
    }

    // CANCEL NEW POST
    function handleCancelNewPostClick() {
        navigate('/')
    }

    // TEMPLATE
    return <div>

        <header className="home-header">
            <h1><Link href="" onClick={handleHomeClick}>Home</Link></h1>
            <div>
                <Link href="" onClick={handleProfileClick}>{name}</Link> <Button onClick={handleFavsPostsClick}>Favs</Button> <Button onClick={handleLogoutClick}>Logout ❌</Button>
            </div>
        </header>

        <div className="home-view">
            <Routes>
                <Route path="/profile" element={<Profile onClick={handleProfileClick} />}></Route>
                <Route path="/newpost" element={<NewPost onPublish={handleNewPostPublish} onCancel={handleCancelNewPostClick} />}></Route>
                <Route path="/" element={<Posts loadPosts={logic.retrievePosts.bind(logic)} stamp={stamp} />}></Route>
                <Route path="/favs" element={<Posts loadPosts={logic.retrieveFavUserPosts.bind(logic)} />}></Route>
                <Route path="/users/:userId/posts" element={<UserPosts stamp={stamp} />}></Route>
            </Routes>

            <br></br>
            <br></br>
            <br></br>

            <footer className="footer">
                {location.pathname !== '/profile' && location.pathname !== '/favs' && location.pathname !== '/newpost' &&
                    <Button onClick={handleNewPostClick}>+</Button>}
            </footer>
        </div>

    </div >
}

export default Home