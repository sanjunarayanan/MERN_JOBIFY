import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext()

  // if there is no user we will return the landing page
  if (!user) {
    return <Navigate to="/landing" />
  }

  // if user is available then it return the children which is in the shared layout
  return children
}

export default ProtectedRoute
