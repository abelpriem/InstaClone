import dotenv from 'dotenv'
dotenv.config()
// Requerimos la librería 'dotenv' y su método config() para que lea el archivo .env y nos traiga las variables de MONGODB_URL y PORT en nuestro servidor

import express from 'express'
import mongoose from 'mongoose'

import cors from 'cors'

import {
    authenticateUserHandler,
    changeEmailUserHandler,
    changePasswordUserHandler,
    createPostHandler,
    deletePostHandler,
    registerUserHandler,
    retrieveFavPostHandler,
    retrievePostHandler,
    retrieveUserHandler,
    retrieveUserPostsHandler,
    toggleFavPostHandler,
    toggleLikePostHandler,
    togglePostCommentHandler,
    updatePostTextHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {

        // Iniciamos el servidor
        const server = express()

        // Hacemos que la respuesta al servidor se envíe el 'Hello API.6'
        // server.get('/', (req, res) => res.send('Hello API.6'))

        // TEST IN BROWSER 'GET' in localhost:8000/hello?name=Abel&surname=Prieto
        // server.get('/hello', (req, res) => res.send(`Hello, ${req.query.name} ${req.query.surname}!`))

        // Permite convertir cualquier petición con un cuerpo .JSON en un objeto en la propiedad 'body' de la request
        const jsonBodyParser = express.json()

        // Con server.use() te permite usar un middleware a nivel global para que lo tengan todas las respuestas a peticiones al servidor y con next(), hace que continuen
        server.use(cors())

        // TEST in browser 'POST' in localhost 'REGISTER USER'
        server.post('/users', jsonBodyParser, registerUserHandler)

        // TEST in browser 'POST' in localhost 'AUTHENTICATE USER'
        server.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        // TEST in browser 'GET' in localhost 'RETRIEVE USER'
        server.get('/users', retrieveUserHandler)

        // TEST in browser 'POST' in localhost 'CHANGE EMAIL USER'
        server.post('/users/email', jsonBodyParser, changeEmailUserHandler)

        // TEST in browser 'POST' in localhost 'CHANGE PASSWORD USER'
        server.post('/users/password', jsonBodyParser, changePasswordUserHandler)

        // TEST in browser 'POST' in localhost 'CREATE POST'
        server.post('/newpost', jsonBodyParser, createPostHandler)

        // TEST in browser 'GET' in localhost 'RETRIEVE POST'
        server.get('/newpost', retrievePostHandler)

        // TEST in browser 'GET' in localhost 'RETRIEVE FAV POST'
        server.get('/users/favs', retrieveFavPostHandler)

        // TEST in browser 'DELETE' in localhost 'DELETE POST'
        server.delete('/users/:postId/favs', deletePostHandler)

        // TEST in browser 'PATCH' in localhost 'TOGGLE LIKE POST'
        server.patch('/newpost/:postId/likes', toggleLikePostHandler)

        // TEST in browser 'PATCH' in localhost 'TOGGLE FAV POST'
        server.patch('/users/:postId/favs', toggleFavPostHandler)

        // TEST in browser 'PATCH' in localhost 'UPDATE POST TEXT'
        server.patch('/newpost/:postId/edit', jsonBodyParser, updatePostTextHandler)

        // TEST in browser 'PATCH' in localhost 'ADD POST COMMENT'
        server.patch('/newpost/:postId/comments', jsonBodyParser, togglePostCommentHandler)

        // TEST in browser 'GET' in localhost 'RETRIEVE USER POSTS'
        server.get('/users/:userId/posts', retrieveUserPostsHandler)

        // Hacemos que el servidor se mantenga en escucha a través del puerto 8000 e imprima un console.log()
        server.listen(process.env.PORT, () => console.log(`server online! Listen on: ${process.env.PORT}`))
    })
    .catch(error => console.error(error))
