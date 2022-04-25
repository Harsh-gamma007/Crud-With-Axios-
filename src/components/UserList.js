import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { Card, Table, Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { Snackbar, Stack } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(10),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

const UserList = () => {
  //const user = userSelect((store) => store.users)
  const [users, setUser] = useState([])

  const [open, setOpen] = React.useState(false)
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const loadUsers = async () => {
    try {
      var result = await axios.get('http://localhost:3003/users')
      await setUser(result.data)
      // console.log(users)
    } catch (error) {
      alert('Something Went Wrong!!')
    }
  }
  useEffect(() => {
    loadUsers()
  }, [])

  const deleteUser = async (id) => {
    setOpen(true)
    await axios.delete(`http://localhost:3003/users/${id}`)
    loadUsers()
  }

  const displayUser = () => {
    return (
      <Card border="secondary">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e, index) => (
              <tr key={e.id}>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.email} </td>
                <td>{e.phone}</td>
                <td>
                  {/* <Button>
                    <FontAwesomeIcon icon={faEye} />
                  </Button> */}
                  <Button variant="warning">
                    {' '}
                    <Link to={`/user/editUser/${e.id}`}>
                      <FontAwesomeIcon icon={faUserEdit} />
                    </Link>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteUser(`${e.id}`)}
                  >
                    <FontAwesomeIcon icon={faDeleteLeft} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Stack spacing={2} sx={{ width: '50%' }}>
          <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              User Deleted Successfully..
            </Alert>
          </Snackbar>
        </Stack>
      </Card>
    )
  }
  return (
    <>
      {users.length ? (
        displayUser()
      ) : (
        <div>
          <h1>No User Found</h1>
        </div>
      )}
    </>
  )
}
export default UserList
