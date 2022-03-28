import "./App.css";

//Components
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AseguradosForm from "./components/AseguradosForm";
import ConsultaForm from "./components/ConsultaForm";
import ReclamoForm from "./components/ReclamoForm";
import TipoSolicitanteDropDown from "./components/dropdowns/TipoSolicitanteDropDown";

//React Router
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";

//PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router initialEntries={["/"]}>
      <div className="p-d-inline-flex">
        <Header></Header>
        <div style={{ width: "450px", margin: "auto" }}>
          <NavBar></NavBar>
          <TipoSolicitanteDropDown />
          <Routes>
            <Route exact path="/" element={<AseguradosForm />} />
            <Route path="/consulta" element={<ConsultaForm />} />
            <Route path="/reclamo" element={<ReclamoForm />} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
