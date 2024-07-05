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
    ]
})

const User = model('User', user)
const Post = model('Post', post)
// Crea las clases User-Post en base al esquema 'user' o 'post' creados anteriormente (nombre, esquema)

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        // const pepito = new User({ name: 'Pepito Grillo', email: 'pepito@grillo.com', password: '123123123' })
        
        // pepito.save()
        //     .then(() => console.log('user saved!'))
        //     .catch(error => console.error(error))

        // const post = new Post({ author: '6593f8ed0f017ebedeef6e41', image: 'https://static.wikia.nocookie.net/disney/images/b/bb/Jiminyumbrella.png/revision/latest?cb=20221116203317&path-prefix=es', text: 'soy pepito!!' })

        // post.save()
        //     .then(() => console.log('post saved!'))
        //     .catch(error => console.error(error))
        
        // Post.findById('6593ffce9da8bde7ec6316d0')
        //     .then(post => {
        //         post.likes.push('6594000213a54d0ae5081421')

        //         post.save()
        //             .then(() => console.log('post liked!'))
        //             .catch(error => console.error(error))
                
        //     })
        //     .catch(error => console.error(error))

        User.findById('6594000213a54d0ae5081421')
            .then(user => {
                user.favs.push('6593ffce9da8bde7ec6316d0')

                user.save()
                    .then(() => console.log('post favorited!'))
                    .catch(error => console.error(error))
                
            })
            .catch(error => console.error(error))
        
        
    })
    .catch(error => console.error(error))
