import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'
import Axios from 'axios'
import { validationSchema } from './schema'
import { Formik, Form, Field } from 'formik'
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

//Data
const initialValues = {
  name: '',
  email: '',
  phone: '',
}

const AddUser = () => {
  const classes = useStyle()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const { name, email, phone } = user

  // const onInputChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value })
  // }

  const [open, setOpen] = React.useState(false)

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const registerWithApp = async (data) => {
    const { name, email, phone } = data
    setUser({
      name: name,
      email: email,
      phone: phone,
    })
    await Axios.post('http://localhost:3003/users', data)
    navigate('/')
  }
  return (
    <>
      <h1 className="text-center">Add User</h1>
      <Card className={classes.padding}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values)
            registerWithApp(values)
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
                    Add User
                  </Button>
                  <Stack spacing={2} sx={{ width: '50%' }}>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: '100%' }}
                      >
                        User Added Successfully..
                      </Alert>
                    </Snackbar>
                  </Stack>
                </CardActions>
              </Form>
            )
          }}
        </Formik>
      </Card>
    </>
  )
}

export default AddUser
