import mongoose from 'mongoose'
const { Schema, model, ObjectId } = mongoose
// Nos traemos los parametros propios de mongoose que vayamos a utilizar

const user = new Schema({ 
    name: {
        type: String,   // Tipo
        required: true  // Requerido
    },
    email: {
        type: String,
        required: true,
        unique: true    // Unico
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    favs: [
        {
            type: ObjectId,
            ref: 'Post'
        }
    ]
})

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'     // Se refiere a la db de users
    },
    image: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: String
        }
    ]
})

const User = model('User', user)
const Post = model('Post', post)

export {
    User,
    Post
}