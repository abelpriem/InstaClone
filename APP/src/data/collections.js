import { User, Post, CreditCard } from "./models"
import randomDelay from "../utils/randomDelay"
import { validateText } from "../utils/validators"

// COLLECTION

class Collection {
    constructor(clazz, documents) {
        this.__clazz__ = clazz
        this.__documents__ = documents
    }

    // CLONE DOC.
    __clone__(document) {
        var copy = new this.__clazz__

        for (var key in document) {
            var value = document[key] 

            if (value instanceof Array) 
                copy[key] = [...value]

            else if (value instanceof Date)
                copy[key] = new Date(document[key]) 

            else if (value instanceof Object)
                copy[key] = {...value}

            else
                copy[key] = document[key]

        }

        return copy
    }

    // DELETE DOC. BY ID
    deleteById(id, callback) {
        try {
            validateText(`${this.__clazz__.name} id`) 

            randomDelay(() => {
                this.__findIndexById__(id, (error, index) => {
                    if (error) {
                        callback(error)

                        return
                    }

                    if (index < 0) {
                        callback(new Error(`${this.__clazz__.name} not found`))
    
                        return
                    }
            
                    // this.__documents__.splice(index, 1)
        
                    callback(null, this.__documents__.splice(index, 1))
                })
            }, 0.3)
        } catch (error) {
            callback(error)
        }
    }
    
    // GENERATE RANDOM & UNIQUE ID
    __generateId__() {
        return Math.floor(Math.random() * 1000000000000000000).toString(36)
    }

    // CREATE DOC.
    insert(document, callback) {
        randomDelay(() => {
            const documentCopy = this.__clone__(document)

            documentCopy.id = this.__generateId__()
    
            this.__documents__.push(documentCopy)

            callback()
        }, 0.3)
    }

    // FIND DOC. BY ID
    findById(id, callback) { 
        try {
            validateText(id, `${this.__clazz__.name} id`)

            randomDelay(() => {
                const document = this.__documents__.find(document => document.id === id)
         
                if (!document) {
                    callback(null, null)
    
                    return
                }
         
                callback(null, this.__clone__(document)) 
            }, 0.6)
        } catch (error) {
            callback(error)
        }
    }

    // FIND DOC. ID BY INDEX
    __findIndexById__(id, callback) {
        try {
            validateText(id, `${this.__clazz__.name} id`)

            randomDelay(() => {
                const index = this.__documents__.findIndex(document => document.id === id)
    
                callback(null, index)
            }, 0.4)
        } catch (error) {
            callback(error)
        }
    }
    

    // UPDATE DOC.
    update(document, callback) {
        try {
            if(!(document instanceof this.__clazz__)) {
                throw new TypeError(`document is not a ${this.__clazz__.name}`)
            }

            randomDelay(() => {
                this.__findIndexById__(document.id, (error, index) => {
                    if (error) {
                        callback(error)

                        return
                    }
                    
                    if (index < 0) {
                        callback(new Error(`${this.__clazz__.name} not found`))

                        return
                    }
            
                    this.__documents__[index] = this.__clone__(document)
                    
                    callback(null)
                })
            }, 0.5)
        } catch (error) {
            callback(error)
        }
    }
}

class Users extends Collection {
    constructor() {
        super(User, [])
    }

    // FIND BY EMAIL
    findByEmail(email, callback) {
        try {
            validateText(`email, ${this.__clazz__.name} email`)

            randomDelay(() => {
                const user = this.__documents__.find(document => document.email === email)
         
                if (!user) {
                    callback(null, null)
    
                    return
                }
             
                callback(null, this.__clone__(user))
            }, 0.7)
        } catch (error) {
            callback(error)
        }
    }
    
    // GET 
    getAll(callback) {
        randomDelay(() => {
            callback(null, this.__documents__.map(this.__clone__.bind(this)))
        }, 0.8)
    }
}

class Posts extends Collection {
    constructor() {
        super(Post, [])
    }

    // GET 
    getAll(callback) {
        randomDelay(() => {
            callback(null, this.__documents__.map(this.__clone__.bind(this)))
        }, 0.8)
    }
}

class CreditCards extends Collection {
    constructor() {
        super(CreditCard, [])
    }
} 

export {
    Users,
    Posts,
    CreditCards
}

// var users = new Collection(User, db.users)

// var user = new User(null, 'Ada Love', 'ada@love.com', '123123123')
// users.create(user)

// - - INFO - - 

// Queremos crear una clase Collection para traernos todos los manejadores de datos a una misma clase y poder así pasar dichos "métodos" en un todo.

// Estructuramos la clase Collection y en su contructor, le pasamos como argumentos:

// - Una clase (this.__clazz__), diferente de "class" (palabra reservada y PRIVADA (con los signos bajos)), en la que collection pueda saber/diferenciar si es User o Post
// - La propia collection para determinar el this de la clase


     