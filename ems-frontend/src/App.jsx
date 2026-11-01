import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmmployeeComponent from "./components/ListEmployeeComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* // http://localhost:3000 */}
            <Route path="/" element={<ListEmmployeeComponent />} />
            {/* // http://localhost:3000/employees */}
            <Route path="/employees" element={<ListEmmployeeComponent />} />
            {/* // http://localhost:3000/add-employee */}
            <Route path="/add-employee" element={<EmployeeComponent />} />
            {/* // http://localhost:3000/update-employee/1 */}
            <Route path="/update-employee/:id" element={<EmployeeComponent />} />
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
