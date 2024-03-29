import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div>
            <h1>404</h1>
            <h3>Page Not Found</h3>
            <Link to="/">Home Page</Link>
        </div>
    )
}

export default NotFound
