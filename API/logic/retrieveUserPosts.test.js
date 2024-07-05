import mongoose from 'mongoose'
import retrieveUserPosts from './retrieveUserPosts.js'

mongoose.connect('mongodb://127.0.0.1:27017/api')
    .then(() => {
        try {
            retrieveUserPosts("65bd36ce5ddc38a66f31e9a0", "65bd35a35ddc38a66f31e722")
                .then(posts => console.log("posts from owner retrieved!", posts))
                .catch(error => console.error(error))
        } catch(error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error.message))