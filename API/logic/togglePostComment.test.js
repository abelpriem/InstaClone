import mongoose from 'mongoose'
import togglePostComment from './togglePostComment'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            togglePostComment('659eb74801ced6e04a9df79d', '65a3b9842bbb46a83c1925eb', 'Me gusta ese juego!', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('comment add succesfully!')
            })
        } catch (error) {
            console.error(error.message)
        }
    })
    .catch(error => console.log(error))
