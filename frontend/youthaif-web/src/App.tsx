import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SevathonPage from './pages/SevathonPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="sevathon" element={<SevathonPage />} />
      </Route>
    </Routes>
  )
}

export default App
