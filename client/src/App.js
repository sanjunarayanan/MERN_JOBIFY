import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Error, Register, ProtectedRoute } from './pages'
import {
  AllJobs,
  Profile,
  AddJob,
  Stats,
  SharedLayout,
} from './pages/Dashboard/index'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />}></Route>
          <Route path="add-job" element={<AddJob />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/register" element={<Register></Register>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error></Error>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
