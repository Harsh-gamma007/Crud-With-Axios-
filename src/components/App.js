import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Header = React.lazy(() => import('./Header'))
const AddUser = React.lazy(() => import('./AddUser'))
const UserList = React.lazy(() => import('./UserList'))
const Notfound = React.lazy(() => import('./NotFound'))
const EditUser = React.lazy(() => import('./EditUser'))

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<UserList />} />
          <Route exact path="/addUser" element={<AddUser />} />

          <Route exact path="/user/editUser/:id" element={<EditUser />} />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
