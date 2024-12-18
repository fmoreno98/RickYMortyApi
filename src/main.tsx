import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonajeDetalle from './components/PersonajeDetalle';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/personaje/:id" element={<PersonajeDetalle />} />
    </Routes>
  </BrowserRouter>
)
