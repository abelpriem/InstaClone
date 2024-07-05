import mongoose from 'mongoose'
import retrieveFavs from './retrieveFavs'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            retrieveFavs('6595b6f5a456f32af3f9b029')
            .then(favs => console.log('favs retrieved!', favs))
            .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error.message))