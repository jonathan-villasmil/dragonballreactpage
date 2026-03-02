import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from './App.tsx'
import { CharacterDetail } from './pages/CharacterDetail.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
    </Routes>
  </BrowserRouter>
)
