function Label(props) {
    return <label htmlFor={props.forId}>{props.children}</label>

}

export default Label