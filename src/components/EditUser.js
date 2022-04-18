import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'
import Axios from 'axios'

import { Formik, Form, Field } from 'formik'
import { validationSchema } from './schema'
import { TextField } from 'formik-material-ui'
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

const initialValues = {
  name: '',
  email: '',
  phone: '',
}

const EditUser = () => {
  const classes = useStyle()
  const navigate = useNavigate()
  const { id } = useParams()
  const [open, setOpen] = React.useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const { name, email, phone } = user
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const updateData = async (data) => {
    const { name, email, phone } = data
    setUser({
      name: name,
      email: email,
      phone: phone,
    })
    await Axios.put(`http://localhost:3003/users/${id}`, data)
    navigate('/')
  }
  const loadUser = async () => {
    const result = await Axios.get(`http://localhost:3003/users/${id}`)
    console.log(result.data)
    setUser(result.data)
  }
  useEffect(() => {
    setUser(loadUser())
  }, [])
  return (
    <>
      <h1 className="text-center">Edit User</h1>
      <Card className={classes.padding}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(user)
            updateData(values)
            setOpen(true)
            resetForm()
          }}
        >
          {({ dirty, isValid, values, handleBlur, handleReset }) => {
            return (
              <Form className="text-center">
                <CardContent>
                  <Grid item container spacing={1} justify="center">
                    <Grid item xs={12} sm={12} md={8}>
                      <Field
                        label="Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        component={TextField}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={8}>
                      <Field
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Field
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        value={values.phone}
                        type="number"
                        onBlur={handleBlur}
                        component={TextField}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions style={{ textAlign: 'center' }}>
                  <Button
                    disabled={!dirty || !isValid}
                    variant="contained"
                    color="primary"
                    type="Submit"
                    className={classes.button}
                    onSubmit={handleReset}
                  >
                    Update user
                  </Button>

                  <Link to="/">
                    <Button variant="contained" color="secondary">
                      Cancel
                    </Button>
                  </Link>
                </CardActions>
                <Stack spacing={2} sx={{ width: '50%' }}>
                  <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: '100%' }}
                    >
                      User Data Updated Successfully..
                    </Alert>
                  </Snackbar>
                </Stack>
              </Form>
            )
          }}
        </Formik>
      </Card>
    </>
  )
}

export default EditUser
