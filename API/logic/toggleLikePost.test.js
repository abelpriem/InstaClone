import mongoose from 'mongoose'
import toggleLikePost from './toggleLikePost'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            toggleLikePost('6594280f88dc69a7d9e4e18f', '65967a8eae0c052505f5f059')
                .then(() => console.log('toggle like success!!'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

