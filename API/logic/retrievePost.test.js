import mongoose from 'mongoose'
import retrievePost from './retrievePost'


mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {    
        try {
            retrievePost('6595b6f5a456f32af3f9b029')
                .then(post => console.log('post retrieved:', post))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error.message))
