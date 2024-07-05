import mongoose from 'mongoose'
import deletePost from './deletePost'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            deletePost('659c1bd1492d8b445a0884b7', '65967a8eae0c052505f5f059')
                .then(() => console.log('post succesfully deleted!'))
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))