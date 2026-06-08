import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/Admin/Login'
import AdminIndex from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas con Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/carta" element={<Menu />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/contacto" element={<Contact />} />
        </Route>

        {/* Rutas admin sin Layout público */}
        <Route path="/admin" element={<AdminIndex />} />
        <Route path="/admin/login" element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}