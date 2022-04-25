import React from 'react'
import { Link } from 'react-router-dom'
const Notfound = () => {
  return (
    <div>
      <h1>Page Not Found!!</h1>
      <Link to="/">Go Back to User List</Link>
    </div>
  )
}

export default Notfound
