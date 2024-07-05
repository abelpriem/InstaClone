import mongoose from 'mongoose'
import changeEmailUser from './changeEmailUser.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            changeEmailUser("soy@batman.com", "nosoy@batman.com", "123123123")
                .then(() => console.log("email succesfully changed!"))
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))

