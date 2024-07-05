import logic from '../logic'

import { useContext } from 'react'
import Context from '../Context'
import { Container, Form, Field, Button } from '../librery'


// PROFILE
function Profile() {
    console.log('Profile')

    const { handleError } = useContext(Context)

    // SETTINGS - CHANGE EMAIL
    function handleChangeEmailSubmit(event) {
        event.preventDefault()

        console.log(event.target);

        const newEmail = event.target.querySelector('#new-email').value
        const againNewEmail = event.target.querySelector('#confirm-new-email').value
        const password = event.target.querySelector('#password').value

        try {
            logic.changeUserEmail(newEmail, againNewEmail, password)
                .then(() => alert('Email changed successfully!'))
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    // SETTINGS - CHANGE PASSWORD
    function handleChangePasswordSubmit(event) {
        event.preventDefault()

        const password = event.target.querySelector('#current-password').value
        const newPassword = event.target.querySelector('#new-password').value
        const againNewPassword = event.target.querySelector('#again-new-password').value

        try {
            logic.changeUserPassword(password, newPassword, againNewPassword)
                .then(() => alert('Password changed successfully!'))
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    // TEMPLATE
    return <>
        <Container>
            <h2>Changes credentials</h2>

            <Form onSubmit={handleChangeEmailSubmit}>
                <h3>Change your email: </h3>

                <Field id="new-email" type="email">New email</Field>
                <Field id="confirm-new-email" type="email">Confirm new email</Field>
                <Field id="password" type="password">Password</Field>

                <Button type="submit">Change Email</Button>
            </Form>

            <Form onSubmit={handleChangePasswordSubmit}>
                <h3>Change your password: </h3>

                <Field id="current-password" type="password">Password</Field>
                <Field id="new-password" type="password">New password</Field>
                <Field id="again-new-password" type="password">Confirm new password</Field>

                <Button type="submit">Change Password</Button>
            </Form>

        </Container>
    </>
}

export default Profile