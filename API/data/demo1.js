// const mongodb = require('mongodb')

// const { MongoClient, ObjectId } = mongodb
// // Nos traemos la clase MongoClient de mongodb para instanciar el cliente

// const client = new MongoClient('mongodb://127.0.0.1:27017')
// // Con esa clase, nos conectamos al servidor Mongo

// client.connect()
//     .then(connector => {
//         const db = connector.db('test')

//         const users = db.collection('users')
//         const posts = db.collection('posts')

//         // users.insertOne({ name: 'Ele Fante', email: 'ele@fante.com', password: '1234', favs: [] })
//         //     .then(result => console.log('user created!', result))
//         //     .catch(error => console.error(error))

//         // users.updateOne({ _id: new ObjectId('658dad9a765863d4e8362697') }, { $set: { name: 'Coco Drilo', email: 'coco@drilo.com' } })
//         //     .then(result => console.log('user updated!', result))
//         //     .catch(error => console.error(error))
        
//         // users.findOne({ _id: new ObjectId('658dad9a765863d4e8362697') })
//         //     .then(result => console.log('found!', result))
//         //     .catch(error => console.error(error))

//         // users.deleteOne({ _id: new ObjectId('658dad9a765863d4e8362697') })
//         //     .then(result => console.log('delete!', result))
//         //     .catch(error => console.error(error))

//         // users.find().toArray()
//         //     .then(result => console.log('found all users!', result))
//         //     .catch(error => console.error(error))

//         // posts.insertOne({ author: new ObjectId('65871663b2f1702e04b3399c'), image: 'http://image.com/peter', text: 'hello, peter!', likes: [] })
//         //     .then(result => console.log('post created!', result))
//         //     .catch(error => console.error(error))

//         // posts.find({ author: new ObjectId('65871663b2f1702e04b3399c') }).toArray()
//         //     .then(result => console.log('find!', result))
//         //     .catch(error => console.error(error))
    
//     })
//     .catch(error => console.error(error))