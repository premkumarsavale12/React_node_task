import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MedicineForm from './MedicineForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode> 

<MedicineForm />
 
  </StrictMode>,
)
