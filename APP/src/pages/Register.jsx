import logic from '../logic'
import Context from '../Context'

import { useContext } from 'react'
import { Button, Link, Field, Form, Container } from '../librery'

// REGISTER

function Register(props) {
    console.log('Register')

    const { handleError } = useContext(Context)

    // LOGIN LINK
    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
        // Pasamos el elemento 'props' con el método de click de Login

    }

    // FORM
    function handleSubmit(event) {
        event.preventDefault()

        const name = event.target.querySelector('#name').value
        const email = event.target.querySelector('#email').value
        const password = event.target.querySelector('#password').value

        try {
            logic.registerUser(name, email, password)
                .then(() => props.onSuccess(error))
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    // TEMPLATE
    return <Container>
        <h1>Register</h1>

        <Form onSubmit={handleSubmit}>
            <Field id="name">Username</Field>
            <Field id="email" type="email">Email</Field>
            <Field id="password" type="password">Password</Field>
            <Button type="submit">Register</Button>
        </Form>

        <p>Go back to login!</p>
        <Link href="" onClick={handleLoginClick}>Login</Link>
    </Container>
}

export default Register