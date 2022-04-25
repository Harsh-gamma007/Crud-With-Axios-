import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Header'
import AddUser from './AddUser'
import EditUser from './EditUser'
import UserList from './UserList'
import Notfound from './NotFound'
import { routes } from '../routes/index'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path={routes.UserListRoutes} element={<UserList />} />
        <Route exact path={routes.AddUserRoutes} element={<AddUser />} />
        <Route exact path={routes.EditUserRoutes} element={<EditUser />} />
        <Route path={routes.NotFoundRoutes} element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
