import { useState } from "react";
import EmployeeForm from "./EmployeeForm.jsx";
import MedicineForm from "./Medicine.jsx";

function App() {
  const [selectedForm, setSelectedForm] = useState("");

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar">
        <h2>My Forms</h2>

        <div className="nav-buttons">
          <button onClick={() => setSelectedForm("employee")}>
            Employee Form
          </button>

          <button onClick={() => setSelectedForm("medicine")}>
            Medicine Form
          </button>
        </div>
      </nav>

      {/* Selected Form */}
      <div className="form-container">
        {selectedForm === "employee" && <EmployeeForm />}

        {selectedForm === "medicine" && <MedicineForm />}

      </div>
    </div>
  );
}

export default App;