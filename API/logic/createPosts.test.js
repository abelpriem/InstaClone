import mongoose from 'mongoose'
import createPosts from './createPosts.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            createPosts("659eb73001ced6e04a9df79b", "https://play-lh.googleusercontent.com/7Zn2QBzByBf4XyQPhuRVsOkSaKSYsty1ka-6_bh6Ub-2kQri6xqqRdK52qxEM69N6cw", "Tetris prueba")
                .then(() => console.log("post created succesfully!"))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))