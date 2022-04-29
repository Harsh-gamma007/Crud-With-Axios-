import React, { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider'

import './styles.css'
import axios from '../api/users'
import { Link } from 'react-router-dom'

const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  //   useEffect(() => {
  //     useRef.current.focus()
  //   }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      alert(`form Submitted ${user}, ${pwd}`)
      const response = await axios.post(
        'http://localhost:3003/users',
        JSON.stringify({ user, pwd }),
        {
          header: { 'Content-type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(JSON.stringify(response?.data))
      // console.log(JSON.stringify(response))
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.accessToken
      setAuth({ user, pwd, roles, accessToken })
      setUser('')
      setPwd('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No ServerResponse')
      } else if (err?.response.status === 400) {
        setErrMsg('Missing UserName or Password')
      } else if (err?.response.status === 401) {
        setErrMsg('Unauthrized')
      }
    }
  }
  return (
    <>
      {success ? (
        <section>
          <h1>
            You are logged in! Click to go to the User List
            <Link to="/">Click!</Link>
          </h1>
        </section>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <section>
            <p
              ref={errRef}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live="assetive"
            >
              {errMsg}
            </p>
            <h3>Please Signin..</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="userName">UserName: </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                autoFocus
                required
              />
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                autoFocus
                required
              />
              <button>Login</button>
            </form>
          </section>
        </div>
      )}
    </>
  )
}

export default Login
