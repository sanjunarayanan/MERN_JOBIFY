import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false, /// registered person ....
}

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const {
    isLoading,
    user,
    showAlert,
    displayAlert,
    clearAlert,
    registerUser,
    loginUser,
  } = useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      clearAlert()
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />

        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {showAlert && <Alert />}

        {/* name field */}

        {/* if values.isMember is true 
        then it should not shows the name 
        because its now in login */}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}></FormRow>

        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}></FormRow>
        <button type="submit" className="btn btn-block">
          submit
        </button>

        {/* toggle button */}

        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button
            type="button"
            onClick={toggleMember}
            className="member-btn"
            disabled={isLoading}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
