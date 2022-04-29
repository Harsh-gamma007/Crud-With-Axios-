import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './Header'
import AddUser from './AddUser'
import EditUser from './EditUser'
import UserList from './UserList'
import Login from './Login'
import Notfound from './NotFound'

import { routes } from '../routes/index'

function App() {
  // const [token, setToken] = useState()
  // if (!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path={routes.UserListRoutes} element={<UserList />} />
        <Route exact path={routes.AddUserRoutes} element={<AddUser />} />
        <Route exact path={routes.EditUserRoutes} element={<EditUser />} />
        <Route exact path={routes.LoginRoutes} element={<Login />} />
        <Route path={routes.NotFoundRoutes} element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
