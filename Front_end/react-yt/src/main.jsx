import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmployeeForm from './EmployeeForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode> 

<EmployeeForm />
 
  </StrictMode>,
)
