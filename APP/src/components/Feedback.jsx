import { Container, Button } from "../librery"
import './Feedback.css'

export default function Feedback({ level, message, onAccepted }) {

    return <>
        <Container className={`container--horizontal Feedback--${level}`}>
            <p>{message}</p>
            <Button onClick={onAccepted}>Accept</Button>
        </Container>
    </>
}