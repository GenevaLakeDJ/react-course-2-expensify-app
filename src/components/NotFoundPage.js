import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
    // use link, not <a> and href - as those refresh the browser and link is client side refresh
    <div>
        404 - <Link to="/">Go home</Link>
    </div>
)

export default NotFoundPage