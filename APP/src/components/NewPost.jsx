import logic from '../logic'
import Context from '../Context'
import { useContext } from 'react'
import { Button, Container, Form, Field } from '../librery'

export default function NewPost({ onPublish, onCancel }) {
    console.log('New Post')

    const { handleError } = useContext(Context)

    const handleSubmit = event => {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            logic.publishPost(image, text)
                .then(() => onPublish())
                .catch(error => handleError(error))
        } catch (error) {
            handleError(error)
        }
    }

    const handleCancel = event => {
        event.preventDefault()

        onCancel()
    }

    return <Container className="new-post">
        <h2>New post</h2>

        <Form onSubmit={handleSubmit}>
            <Field id="image" type="url">Image</Field>
            <Field id="text">Text</Field>

            <Button type="submit">Post</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
    </Container>
}
