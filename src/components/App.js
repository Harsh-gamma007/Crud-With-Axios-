import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Header'
import AddUser from './AddUser'
import EditUser from './EditUser'
import UserList from './UserList'
import Notfound from './NotFound'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route exact path="/addUser" element={<AddUser />} />
        <Route exact path="/user/editUser/:id" element={<EditUser />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
