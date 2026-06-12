import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppPage } from './pages/AppPage'
import { Landing } from './pages/Landing'
import { Privacy } from './pages/Privacy'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
