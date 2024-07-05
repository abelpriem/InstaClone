function Link(props) {
    return <a className="link" href={props.href} onClick={props.onClick}>{props.children}</a>
}

export default Link