import React from 'react'
import { useAppContext } from '../context/appContext'

const Alert = () => {
  const { alertType, alertMessage } = useAppContext()
  return <div className={`alert alert-${alertType}`}>{alertMessage}</div>
}

export default Alert
