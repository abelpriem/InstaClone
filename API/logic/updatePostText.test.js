import mongoose from 'mongoose'
import updatePostText from './updatePostText'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            updatePostText('65942e03e5a6dab915783e58', '65942e77657640a65767094d', 'Im Batman!!')
                .then(() => console.log('text post updated!'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error.message)
        }
    })
    .catch(error => console.log(error))