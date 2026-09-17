import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SevathonPage from './pages/SevathonPage'
import ReportPage from './pages/ReportPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="sevathon" element={<SevathonPage />} />
        <Route path="reports" element={<ReportPage />} />
      </Route>
    </Routes>
  )
}

export default App
