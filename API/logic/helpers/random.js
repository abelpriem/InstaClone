function name() {
    return `name-${Math.random()}`
}

function email() {
    return `email-${Math.random()}@gmail.com`
} 

function password() {
    return `password-${Math.random()}`
}

function image() {
    return `image-${Math.random()}`
}

function text() {
    return `text-${Math.random()}`
}

const random = {
    name,
    email,
    password,
    image,
    text
}

export default random