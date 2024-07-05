import mongoose from 'mongoose'
import changePasswordUser from './changePasswordUser.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            changePasswordUser("peter@pan.com", "123123123", "hello123123123")
                .then(() => console.log("password succesfully changed!"))
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    })
    .catch (error => console.error(error))
