import { Route, Routes } from 'react-router'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
